export type VariantId = 'noir' | 'prism' | 'shift'

export interface VariantMeta {
  id: VariantId
  name: string
  subtitle: string
  description: string
  features: string[]
}

export interface ProjectMeta {
  number: string
  name: string
  brand: string
  purpose: string
  status: 'foundation' | 'in-development' | 'complete'
  variants: VariantMeta[]
}
