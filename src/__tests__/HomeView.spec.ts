// // src/__tests__/YourComponent.spec.ts
// import { mount } from "@vue/test-utils";
// import { describe, it, expect, vi } from "vitest";
// import YourComponent from "@/pages/HomeView.vue";
// import { createStore } from "vuex";

// describe("YourComponent.vue", () => {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   let wrapper: any;

//   beforeEach(() => {
//     // Mount the component before each test
//     wrapper = mount(YourComponent);
//   });
//   it("dispatches the correct action with payload on button click and updates the state", async () => {
//     // Define the initial state and the mutation to update it
//     const state = {
//       alertDetails: {
//         showAlert: false,
//         title: "",
//         text: "",
//         icon: "",
//         variant: "",
//         closable: false,
//         type: "",
//       },
//     };

//     const mutations = {
//       updateAlertDetails: (state:any, payload:any) => {
//         state.alertDetails = { ...payload };
//       },
//     };

//     // Mock the store, including the action and mutation
//     const mockStore = createStore({
//       state,
//       mutations,
//       actions: {
//         updateAlertDetails: ({ commit } :any, payload:any) => {
//           commit("updateAlertDetails", payload);
//         },
//       },
//     });

//     // Spy on dispatch
//     const dispatchSpy = vi.spyOn(mockStore, "dispatch");

//     // Mount the component with the mocked store
//     const wrapper = mount(YourComponent, {
//       global: {
//         plugins: [mockStore],
//       },
//     });

//     // Find the button and simulate a click
//     const button = wrapper.find("v-btn"); // Adjust selector if needed
//     await button.trigger("click");

//     // Verify that the action was dispatched with the correct payload
//     expect(dispatchSpy).toHaveBeenCalledWith("updateAlertDetails", {
//       showAlert: true,
//       title: "This is an alert title",
//       text: "This is an alert text",
//       icon: "mdi-alert",
//       variant: "tonal",
//       closable: true,
//       type: "success", // Or other type based on the button clicked
//     });

//     // Check that the state has been updated as expected
//     expect(mockStore.state.alertDetails).toEqual({
//       showAlert: true,
//       title: "This is an alert title",
//       text: "This is an alert text",
//       icon: "mdi-alert",
//       variant: "tonal",
//       closable: true,
//       type: "success",
//     });

//     // Restore the spy after the test
//     dispatchSpy.mockRestore();
//   });
// });
