import create from "zustand";

interface State {
  subscriptionPlan: any;
  setSubscriptionPlan: (subscriptionPlan: any) => void;
}

export const useStore = create<State>((set) => ({
  subscriptionPlan: null,
  setSubscriptionPlan: (subscriptionPlan: any) =>
    set(() => ({ subscriptionPlan })),
}));
