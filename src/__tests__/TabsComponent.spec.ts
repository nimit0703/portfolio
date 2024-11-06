// // src/__tests__/TabsComponent.spec.ts
// import { mount } from '@vue/test-utils';
// import { describe, it, expect } from 'vitest';
// import Tabs from '@/components/globle/tabs/TabsComponent.vue';

// describe('TabsComponent.vue', () => {
//   let wrapper: any;

//   beforeEach(() => {
//     // Mount the component before each test
//     wrapper = mount(Tabs);
//   });

//   it('renders the correct number of tabs', () => {
//     const tabs = wrapper.findAll('v-tab');
//     expect(tabs).toHaveLength(3); // Expect 3 tabs to be rendered
//     expect(tabs[0].text()).toBe('Landscape'); // Check tab labels
//     expect(tabs[1].text()).toBe('City');
//     expect(tabs[2].text()).toBe('Abstract');
//   });

//   it('renders the correct number of images for the selected tab', async () => {
//     // Simulate selecting the first tab
//     await wrapper.vm.$emit('update:modelValue', 1); 
//     await wrapper.vm.$nextTick(); // Wait for DOM updates
    
//     const images = wrapper.findAll('v-tabs-window-item:nth-child(1) v-img'); 
//     expect(images).toHaveLength(9); // Expect 9 images for the selected tab
//   });

//   it('changes the displayed images when a different tab is selected', async () => {
//     // Select the first tab and verify images
//     await wrapper.vm.$emit('update:modelValue', 1); // Set tab to 1
//     await wrapper.vm.$nextTick(); // Wait for DOM updates
//     let images = wrapper.findAll('v-tabs-window-item:nth-child(1) v-img'); 
    
//     expect(images).toHaveLength(9); // Check the number of images for tab 1

//     // Select the second tab and verify images
//     await wrapper.vm.$emit('update:modelValue', 2); // Set tab to 2
//     await wrapper.vm.$nextTick(); // Wait for DOM updates
//     images = wrapper.findAll('v-tabs-window-item:nth-child(2) v-img'); 
//     expect(images).toHaveLength(9); // Check the number of images for tab 2
//   });
// });
