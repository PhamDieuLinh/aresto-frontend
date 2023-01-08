import { mount } from '@vue/test-utils'
import RVerwaltenView from '@/views/RVerwaltenView'
import RErstellen from '@/components/RErstellen'
import RBearbeiten from '@/components/RBearbeiten'
import BewertungenView from '@/views/BewertungenView'

describe('Testing Restaurants.vue', () => {

  it('should have rerstellen component', () => {
    // when
    const wrapper = mount(RVerwaltenView)

    // then
    const erstellenComp = wrapper.findComponent(RErstellen)
    expect(erstellenComp.exists()).toBeTruthy()
  })

  it('should have persons create form component', () => {
    // when
    const wrapper = mount(BewertungenView)

    // then
    const bearbeitenComp = wrapper.findComponent()
    expect(bearbeitenComp.exists()).toBeTruthy()
  })
})
