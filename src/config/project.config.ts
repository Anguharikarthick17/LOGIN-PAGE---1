import type { ProjectMeta } from '../types/project'

export const projectMeta: ProjectMeta = {
  number: '#001',
  name: 'LOGIN PAGE',
  brand: 'GENZLOG',
  purpose: 'A premium, reusable login and signup UI kit that developers can preview, customize, and download for free.',
  status: 'foundation',
  variants: [
    {
      id: 'noir',
      name: 'NOIR',
      subtitle: 'Luxury Minimalism',
      description: 'Editorial typography, refined split-screen layout, and razor-sharp monochrome contrast.',
      features: ['Split-screen editorial balance', 'Monochrome high-contrast accents', 'Minimalist text inputs'],
    },
    {
      id: 'prism',
      name: 'PRISM',
      subtitle: 'Translucent Glass Surfaces',
      description: 'Layered translucent cards, subtle refractive borders, and depth without visual noise.',
      features: ['Layered glassmorphism surfaces', 'Subtle border luminance', 'Translucent focus states'],
    },
    {
      id: 'shift',
      name: 'SHIFT',
      subtitle: 'Experimental Asymmetry',
      description: 'Asymmetric grid composition, bold developer-first typography, and offset focal points.',
      features: ['Offset grid alignment', 'Technical badge details', 'Monospace numeric indicators'],
    },
  ],
}
