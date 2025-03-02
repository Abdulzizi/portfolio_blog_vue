import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'relative inline-flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wide border-2 border-black bg-transparent text-black transition-all duration-100 active:translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-black text-white border-black',
        destructive: 'bg-red-600 text-white border-red-700 hover:bg-red-700',
        outline: 'border-2 border-black text-black hover:text-white',
        secondary: 'bg-gray-900 text-white border-gray-800 hover:bg-gray-700',
        ghost: 'text-black border-transparent hover:border-black hover:bg-gray-100',
        link: 'text-black underline underline-offset-2 hover:no-underline',
      },
      size: {
        default: 'h-12 px-6 text-lg',
        xs: 'h-8 px-3 text-xs',
        sm: 'h-10 px-4 text-sm',
        lg: 'h-14 px-8 text-xl',
        icon: 'h-12 w-12 flex items-center justify-center',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
