import { mount } from '@vue/test-utils'
import RErstellen from '@/components/RErstellen'

describe('Testing RestaurantsCreateForm.vue', () => {
  it('should not show form by default', () => {
    // when
    const wrapper = mount(RErstellen)

    // then
    expect(wrapper.find('#rerstellen-staticBackdrop').classes()).not.toContain('show')
  })
})
