import { AccordionItem } from './components/accordion/accordion';
import { ListboxOption } from './components/listbox/listbox';
import { TabItem } from './components/tab-group/tab-group';
import { COUNTIES } from './counties';

// County codes run in former-province order, so each province is a slice of COUNTIES
const PROVINCES = [
  { name: 'Coast', counties: COUNTIES.slice(0, 6) },
  { name: 'North Eastern', counties: COUNTIES.slice(6, 9) },
  { name: 'Eastern', counties: COUNTIES.slice(9, 17) },
  { name: 'Central', counties: COUNTIES.slice(17, 22) },
  { name: 'Rift Valley', counties: COUNTIES.slice(22, 36) },
  { name: 'Western', counties: COUNTIES.slice(36, 40) },
  { name: 'Nyanza', counties: COUNTIES.slice(40, 46) },
  { name: 'Nairobi', counties: COUNTIES.slice(46) },
];

export const PROVINCE_TABS: TabItem[] = PROVINCES.map((p) => ({
  value: p.name.toLowerCase().replace(/\s+/g, '-'),
  label: p.name,
  content: p.counties.join(', '),
}));

export const PROVINCE_SECTIONS: AccordionItem[] = PROVINCES.map((p) => ({
  title: `${p.name} (${p.counties.length} counties)`,
  content: p.counties.join(', '),
}));

export const COUNTY_OPTIONS: ListboxOption[] = [...COUNTIES]
  .sort((a, b) => a.localeCompare(b))
  .map((county) => ({ value: county, label: county }));
