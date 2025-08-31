import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MortageForm from '../MortgageForm.vue'
import { createPinia, setActivePinia } from 'pinia'
describe('MortageForm', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
  })
  it('initializes with empty form data', () => {
    const wrapper = mount(MortageForm)
    
    expect((wrapper.getByLabelText('#propertyPrice').element as HTMLInputElement).value).toBe('')
    expect((wrapper.getByLabelText('#totalSavings').element as HTMLInputElement).value).toBe('')
    expect((wrapper.getByLabelText('#commission').element as HTMLSelectElement).value).toBe('false')
    expect((wrapper.find('#repaymentRate').element as HTMLInputElement).value).toBe('')
  })
})
