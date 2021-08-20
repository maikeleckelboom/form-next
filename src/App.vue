<template>
  <div class="app-grid-blocks">
    <div class="app-auth-block">
<!--      <RegisterForm/>-->
<!--      <LoginForm/>-->
<!--      <ForgotPasswordForm/>-->
<!--      <ResetPasswordForm/>-->
    </div>
    <div class="app-resource-block">


<!--      <OptionalFieldWrapper/>-->
<!--      <UpdateUserForm/>-->
      <CreateUserForm/>
    </div>
  </div>
</template>

<script>
import RegisterForm from "@/components/forms/auth/RegisterForm.vue";
import LoginForm from "@/components/forms/auth/LoginForm.vue";
import ForgotPasswordForm from "@/components/forms/auth/ForgotPasswordForm.vue";
import ResetPasswordForm from "@/components/forms/auth/ResetPasswordForm.vue";
import CreateUserForm from "@/components/forms/user/CreateUserForm.vue";
import UpdateUserForm from "@/components/forms/user/UpdateUserForm.vue";
import OptionalFieldWrapper from "@/components/forms/OptionalFieldWrapper.vue";

export default {
  name: "App",
  components: {
    OptionalFieldWrapper,
    UpdateUserForm,
    CreateUserForm,
    ResetPasswordForm,
    ForgotPasswordForm,
    LoginForm,
    RegisterForm,
  },
};
</script>
