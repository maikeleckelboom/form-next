<template>
  <!--  <div class="app-grid-blocks">-->
  <!--    <div class="app-auth-block">-->
  <!--      <RegisterForm/>-->
  <!--      <LoginForm/>-->
  <!--      <ForgotPasswordForm/>-->
  <!--      <ResetPasswordForm/>-->
  <!--    </div>-->
  <!--    <div class="app-resource-block">-->
  <!--      <UpdateUserForm/>-->
  <!--      <CreateUserForm/>-->
  <!--    </div>-->
  <!--  </div>-->
  <div class="app-state-machine">
<!--    <CounterMachine/>-->
<!--    <FetchMachine/>-->
<!--    <AuthenticationMachine/>-->
    <SequenceMachine/>
  </div>
</template>

<script>
import RegisterForm from "@/components/forms/auth/RegisterForm.vue";
import LoginForm from "@/components/forms/auth/LoginForm.vue";
import ForgotPasswordForm from "@/components/forms/auth/ForgotPasswordForm.vue";
import ResetPasswordForm from "@/components/forms/auth/ResetPasswordForm.vue";
import CreateUserForm from "@/components/forms/user/CreateUserForm.vue";
import UpdateUserForm from "@/components/forms/user/UpdateUserForm.vue";
import Tooltip from "@/components/misc/Tooltip.vue";
import Switch from "@/components/forms/elements/Switch.vue";
import CounterMachine from "@/components/machines/CounterMachine.vue";
import FetchMachine from "@/components/machines/FetchMachine.vue";
import AuthenticationMachine from "@/components/machines/AuthenticationMachine.vue";
import SequenceMachine from "@/components/machines/SequenceMachine.vue";

export default {
  name: "App",
  components: {
    SequenceMachine,
    AuthenticationMachine,
    FetchMachine,
    CounterMachine,
    Switch,
    Tooltip,
    UpdateUserForm,
    CreateUserForm,
    ResetPasswordForm,
    ForgotPasswordForm,
    LoginForm,
    RegisterForm,
  },
};
</script>
