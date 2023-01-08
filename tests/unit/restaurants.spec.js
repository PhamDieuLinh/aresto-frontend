import { mount } from '@vue/test-utils'
import RVerwaltenView from '@/views/RVerwaltenView'
import RErstellen from '@/components/RErstellen'

describe('Testing Restaurants.vue', () => {
  it('should have rerstellen component', () => {
    // when
    const wrapper = mount(RVerwaltenView)

    // then
    const erstellenComp = wrapper.findComponent(RErstellen)
    expect(erstellenComp.exists()).toBeTruthy()
  })
})
