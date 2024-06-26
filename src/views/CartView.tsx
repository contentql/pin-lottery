'use client'

import inner_hero_shape from '/public/images/elements/inner-hero-shape.png'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { toast } from 'react-toastify'

import TotallCart from '@/components/cart/TotallCart'
import { Cart } from '@/payload-types'
import { trpc } from '@/trpc/client'

const CartView = () => {
  const { data: cartData, refetch: cartDataRefetch } =
    trpc.cart.getCartTickets.useQuery()

  const queryClient = useQueryClient()

  const { mutate: updateCartTicketsCountMutation } =
    trpc.cart.updateTicketsOfUserFromCart.useMutation({
      onSuccess: async () => {
        toast.success('Deleted successfully.')
      },
      onError: async () => {
        toast.error('Unable to delete. Please try again.')
        cartDataRefetch()
      },
      onMutate: async (param: any) => {
        queryClient.setQueryData(
          [['cart', 'getCartTickets'], { type: 'query' }],
          (prev: Cart[]) => {
            return prev.map((cart: Cart) =>
              cart.id === param.id
                ? {
                    ...cart,
                    tickets: param.tickets,
                    total_price: param.total_price,
                  }
                : cart,
            )
          },
        )
      },
    })

  const { mutate: deleteById } = trpc.cart.deleteById.useMutation({
    onSuccess: async () => {
      cartDataRefetch()
      toast.success('Successfully tickets deleted.')
    },
    onError: async () => {
      toast.error('Failed to delete tickets.')
    },
    onMutate: async (param: { id: string }) => {
      queryClient.setQueryData(
        [['cart', 'getCartTickets'], { type: 'query' }],
        (prev: Cart[]) => {
          return prev.filter((cart: Cart) => cart?.id !== param.id)
        },
      )
    },
  })

  const { mutate: deleteAllTicketsOfUserFromCart } =
    trpc.cart.deleteAllTicketsOfUserFromCart.useMutation({
      onSuccess: async () => {
        cartDataRefetch()
        toast.success('Successfully cart cleared.')
      },
      onError: async () => {
        toast.error('Failed to empty cart.')
      },
      onMutate: async () => {
        queryClient.setQueryData(
          [['cart', 'getCartTickets'], { type: 'query' }],
          (prev: any) => [],
        )
      },
    })

  return (
    <>
      {/* Banner Section here */}
      <div className='inner-hero-section'>
        <div className='bg-shape'>
          <Image src={inner_hero_shape} alt='inner_hero_shape' />
        </div>
        {/* <Banner
          breadcrumb={[
            ['Home', '/'],
            ['Lottery', '/'],
            ['Contest No: B2T', '/'],
            ['Pick your Lottery Number', '/'],
            ['My Cart', '/'],
          ]}
        /> */}
      </div>

      {/* Total Cart Section here */}
      <TotallCart
        cartData={cartData as Cart[]}
        updateCartTicketsCountMutation={updateCartTicketsCountMutation}
        deleteById={deleteById}
        deleteAllTicketsOfUserFromCart={deleteAllTicketsOfUserFromCart}
      />
    </>
  )
}

export default CartView
