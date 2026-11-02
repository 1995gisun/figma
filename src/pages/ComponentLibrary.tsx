import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { ButtonOutlined, ButtonPrimary } from '../components/Buttons';
import { Icon, type IconName } from '../components/Icon';
import { MetricCard } from '../components/MetricCard';
import { ProjectRow, ProjectTableHeader } from '../components/ProjectTable';
import { SearchField } from '../components/SearchField';
import { StatusChip } from '../components/StatusChip';
import { color, cssVar, radius } from '../theme/tokens';

const swatches: [string, string][][] = [
  [
    ['Primary', color.blue600],
    ['Primary dark', color.blue700],
    ['Primary light', color.blue50],
    ['Background', color.neutral50],
    ['Surface', color.neutral0],
    ['Border', color.neutral200],
  ],
  [
    ['Text primary', color.neutral800],
    ['Text secondary', color.neutral500],
    ['Success', color.green800],
    ['Success light', color.green50],
    ['Warning', color.orange800],
    ['Warning light', color.orange50],
  ],
];

const spacing = [4, 8, 12, 16, 24, 32];

const iconMasters: [IconName, number][] = [
  ['folder-open', 20],
  ['panels-top-left', 18],
  ['calendar-days', 20],
  ['circle-check', 20],
  ['smartphone', 18],
  ['component', 18],
  ['monitor', 18],
];

function Caption({ children, bold }: { children: ReactNode; bold?: boolean }) {
  return (
    <Typography variant="body2" color="text.secondary" fontWeight={bold ? 700 : 400}>
      {children}
    </Typography>
  );
}

function SpecimenLabel({ children }: { children: ReactNode }) {
  return (
    <Typography variant="body2" color="text.secondary" fontWeight={500}>
      {children}
    </Typography>
  );
}

function SectionHeading({ index, title, description }: { index: string; title: string; description: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Typography variant="body2" color="primary" fontWeight={700}>{index}</Typography>
        <Typography variant="h2" component="h2">{title}</Typography>
      </Box>
      <Caption>{description}</Caption>
    </Box>
  );
}

const panelSx = { p: 6, borderRadius: `${radius.lg}px`, boxShadow: 'none' } as const;

export function ComponentLibrary() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 1120, p: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Library introduction */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="primary" fontWeight={700}>LOCAL DESIGN SYSTEM / 01</Typography>
            <Caption>MATERIAL FOUNDATION · LIGHT</Caption>
          </Box>
          <Typography variant="h1" sx={{ fontSize: 40 }}>MUI Workspace</Typography>
          <Typography sx={{ fontSize: 16 }} color="text.secondary">
            A shared React + Figma starter for focused, consistent workspaces.
          </Typography>
          <Box sx={{ display: 'flex', gap: 6, pt: 1 }}>
            {['Roboto typography', '4 px spacing base', 'Reusable local components'].map((p) => (
              <Box key={p} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 4, height: 4, borderRadius: 1, bgcolor: 'primary.main' }} />
                <Caption>{p}</Caption>
              </Box>
            ))}
          </Box>
        </Box>

        {/* 01 Foundations */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <SectionHeading index="01" title="Foundations" description="Shared visual values" />
          <Paper variant="outlined" sx={{ ...panelSx, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {swatches.map((row, i) => (
                <Box key={i} sx={{ display: 'flex', gap: 3 }}>
                  {row.map(([name, hex]) => (
                    <Box key={name} sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ height: 40, bgcolor: hex, border: `1px solid ${cssVar('color.border.divider')}`, borderRadius: `${radius.sm}px` }} />
                      <Typography variant="body1" fontWeight={500}>{name}</Typography>
                      <Caption>{hex}</Caption>
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', gap: 8 }}>
              <Box sx={{ width: 360, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Caption bold>TYPOGRAPHY</Caption>
                <Typography sx={{ fontSize: 32, fontWeight: 500, lineHeight: 1.25 }}>Roboto</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre' }}>
                  {'32 / Title     20 / Heading     14 / Body'}
                </Typography>
                <Caption>Regular 400 · Medium 500 · Bold 700</Caption>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Caption bold>SPACING &amp; SHAPE</Caption>
                <Box sx={{ display: 'flex', gap: 6, alignItems: 'flex-end' }}>
                  {spacing.map((s) => (
                    <Box key={s} sx={{ width: 52, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ width: s, height: 32, bgcolor: 'primary.light', border: `1px solid ${cssVar('color.border.interactive')}` }} />
                      <Caption>{s}</Caption>
                    </Box>
                  ))}
                </Box>
                <Caption>Radii 4 / 8 / 12 px · Controls 40 px · Table rows 72 px</Caption>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* 02 Component recipes */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <SectionHeading index="02" title="Component recipes" description="6 reusable frame types · Matching sample geometry" />
          <Paper variant="outlined" sx={{ ...panelSx, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Box sx={{ display: 'flex', gap: 8 }}>
              <Box sx={{ width: 480, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <SpecimenLabel>DS/ButtonPrimary · DS/ButtonOutlined</SpecimenLabel>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <ButtonPrimary label="New project" />
                  <ButtonOutlined label="Export report" />
                </Box>
                <Caption>40 px height · Label-driven width · 4 px radius</Caption>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <SpecimenLabel>DS/TextField</SpecimenLabel>
                <SearchField />
                <Caption>240 × 40 px · Leading icon · Placeholder</Caption>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', gap: 8 }}>
              <Box sx={{ width: 480, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <SpecimenLabel>DS/StatusChip</SpecimenLabel>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <StatusChip status="In progress" />
                  <StatusChip status="In review" />
                  <StatusChip status="Completed" />
                </Box>
                <Caption>
                  104 × 24 px · Semantic foreground and tint
                  <br />
                  Progress / Review / Complete
                </Caption>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <SpecimenLabel>DS/MetricCard</SpecimenLabel>
                <Box sx={{ width: 370 }}>
                  <MetricCard label="Active projects" value="8" supportingText="+2 this month" icon={<Icon name="folder-open" />} />
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <SpecimenLabel>DS/ProjectRow</SpecimenLabel>
                <Caption>848 × 72 px · Fixed columns</Caption>
              </Box>
              <Box role="table" sx={{ width: 848, border: `1px solid ${cssVar('color.border.divider')}`, borderRadius: `${radius.md}px`, overflow: 'hidden' }}>
                <ProjectTableHeader />
                <ProjectRow
                  project={{ id: 'demo', name: 'Website redesign', owner: 'Jamie Lee', status: 'In progress', dueDate: 'Nov 12', icon: 'panels-top-left' }}
                />
              </Box>
            </Box>
          </Paper>
          <Caption>Local components · 23 shared variables · Cross-side changes require approval</Caption>
        </Box>

        {/* Local icon assets */}
        <Box sx={{ bgcolor: 'background.paper', borderRadius: `${radius.md}px`, px: 6, py: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Typography variant="body1" fontWeight={500} sx={{ color: cssVar('color.text.strong') }}>
            Icon assets · reusable slot content
          </Typography>
          <Box sx={{ display: 'flex', gap: 8, height: 32 }}>
            {iconMasters.map(([name, size]) => (
              <Icon key={name} name={name} size={size} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
