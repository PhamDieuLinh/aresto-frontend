import { mount } from '@vue/test-utils'
import RErstellen from '@/components/RErstellen'

describe('Testing PersonsCreateForm.vue', () => {
  it('should not show form by default', () => {
    // when
    const wrapper = mount(RErstellen)

    // then
    expect(wrapper.find('#rerstellen-staticBackdrop').classes()).not.toContain('show')
  })
})
