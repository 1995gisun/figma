// 스토리북을 띄우고, GitHub 원격 브랜치에 토큰 변경이 올라오면 자동으로 받아옵니다.
//
//   npm run storybook:sync                 # 현재 브랜치를 5초마다 확인
//   SYNC_INTERVAL=10 npm run storybook:sync
//
// 흐름: Figma 변수 변경 → Tokens Studio Push(design-system/tokens.json 커밋)
//       → 이 스크립트가 fast-forward pull → vite.config.ts 의 wdsTokens 플러그인이 CSS 재빌드 → 스토리북 HMR
// 로컬에 커밋하지 않은 변경이 있거나 브랜치가 갈라지면 받아오지 않고 경고만 남깁니다(작업을 덮어쓰지 않음).
import { execFile, spawn } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const git = async (...args) => (await run('git', args, { maxBuffer: 10 * 1024 * 1024 })).stdout.trim();
const WATCHED = ['design-system/tokens.json', 'tokens/tokens.json'];
const INTERVAL = Number(process.env.SYNC_INTERVAL ?? 5) * 1000;
const now = () => new Date().toLocaleTimeString('ko-KR', { hour12: false });
const log = (msg) => console.log(`\x1b[36m[token-sync ${now()}]\x1b[0m ${msg}`);

const branch = await git('rev-parse', '--abbrev-ref', 'HEAD');
const remoteRef = `refs/remotes/origin/${branch}`;
log(`브랜치 ${branch} 를 ${INTERVAL / 1000}초마다 확인합니다. 감시 파일: ${WATCHED.join(', ')}`);

const sb = spawn('npx', ['storybook', 'dev', '-p', process.env.STORYBOOK_PORT ?? '6006', ...process.argv.slice(2)], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});
sb.on('exit', (code) => process.exit(code ?? 0));
for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => sb.kill(sig));

let busy = false;
async function check() {
  if (busy) return;
  busy = true;
  try {
    await git('fetch', '--quiet', 'origin', `+refs/heads/${branch}:${remoteRef}`);
    const [local, remote] = await Promise.all([git('rev-parse', 'HEAD'), git('rev-parse', remoteRef)]);
    if (local === remote) return;
    const behind = Number(await git('rev-list', '--count', `HEAD..${remoteRef}`));
    if (!behind) return; // 로컬이 앞서 있음(아직 push 안 한 커밋)
    const changed = (await git('diff', '--name-only', `HEAD..${remoteRef}`)).split('\n');
    const touched = WATCHED.filter((f) => changed.includes(f));
    if (!touched.length) {
      log(`원격에 새 커밋 ${behind}개가 있지만 토큰 파일 변경은 없습니다 — 받지 않습니다.`);
      return;
    }
    const dirty = await git('status', '--porcelain', '--untracked-files=no');
    if (dirty) {
      log(`\x1b[33m로컬에 커밋하지 않은 변경이 있어 받지 않습니다. (git stash 후 다시 시도)\x1b[0m`);
      return;
    }
    const head = await git('log', '-1', '--format=%h %an · %s · %cI', remoteRef);
    await git('merge', '--ff-only', '--quiet', remoteRef);
    const committedAt = new Date(head.split(' · ').pop());
    const lag = Math.round((Date.now() - committedAt.getTime()) / 1000);
    log(`\x1b[32m받음\x1b[0m ${head.split(' · ').slice(0, 2).join(' · ')} → ${touched.join(', ')} (커밋 후 ${lag}초)`);
  } catch (err) {
    log(`\x1b[33m확인 실패: ${err.message.split('\n')[0]}\x1b[0m`);
  } finally {
    busy = false;
  }
}
setInterval(check, INTERVAL);
check();
