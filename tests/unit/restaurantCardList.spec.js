import { mount } from '@vue/test-utils'
import RestaurantCardList from '@/components/RestaurantCardList'
import RestaurantCard from '@/components/RestaurantCard'

describe('Testing RestaurantCardList.vue', () => {
  it('should render a Restaurant card for each Restaurant', () => {
    const wrapper = mount(RestaurantCardList, {
      propsData: {
        restaurants: [
          {
            id: 1,
            name: 'res1',
            address: 'addresse 1',
            description: 'des1',
            kategorie: 'THAI',
            bewertungIds: []
          },
          {
            id: 2,
            name: 'res2',
            address: 'addresse 2',
            description: 'des2',
            kategorie: 'THAI',
            bewertungIds: []
          }
        ]
      }
    })

    // then
    const restaurantCard = wrapper.findAllComponents(RestaurantCard)
    expect(restaurantCard.length).toBe(2)
  })
})
