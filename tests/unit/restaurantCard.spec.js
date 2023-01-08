import { mount } from '@vue/test-utils'
import RestaurantCard from '@/components/RestaurantCard'

describe('Testing RestaurantCard.vue', () => {
  it.each`
    bewertungIds        | expected
    ${[]}       | ${'0 Bewertung(en)'}
    ${[{}]}     | ${'1 Bewertung(en)'}
    ${[{}, {}]} | ${'2 Bewertung(en)'}
  `('should render amount of bewertung ($bewertungIds.length bewertungIds)', ({ bewertungIds, expected }) => {
    // when
    const testRestaurant = {
      id: 1,
      name: 'res1',
      address: 'addresse 1',
      description: 'des1',
      kategorie: 'THAI',
      bewertungIds: bewertungIds
    }
    const wrapper = mount(RestaurantCard, {
      propsData: {
        restaurant: testRestaurant
      }
    })

    // then
    const cardTitle = wrapper.find('.card-text')
    expect(cardTitle.text()).toContain(`${expected}`)
  })
})
