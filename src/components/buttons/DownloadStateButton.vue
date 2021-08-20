<template>
  <div class="container">
    <button type="button" class="btn" @click="handleClick">
      <transition name="v-btn-label" mode="out-in">
        <div v-if="button.loading">
          <span class="spinner"></span>
        </div>
        <div v-else-if="button.success">
          <span>Verstuurd</span>
          <svg width="36" height="36" viewBox="0 0 36 36">
            <path fill="#fff" d="M13.5 24.26L7.24 18l-2.12 2.12 8.38 8.38 18-18-2.12-2.12z"/>
          </svg>
        </div>
        <span v-else>Versturen</span>
      </transition>
    </button>
  </div>

</template>

<script>
import {reactive, ref} from "vue";

export default {
  name: 'DownloadStateButton',
  data() {
    return {
      loading: false,
      success: false,
    }
  },
  setup() {
    const initialState = {
      loading: false,
      success: false,
      disabled: false,
    }
    const button = reactive({...initialState})
    let resetTimer = ref(null)

    function resetState() {
      Object.assign(button, initialState);
    }

    function onSubmit() {
      if (button.loading) return;
      if (button.success) {
        if (resetTimer) clearTimeout(resetTimer);
        resetState();
        return;
      }

      button.loading = true;
      button.disabled = true;

      setTimeout(() => {
        button.loading = false;
        button.disabled = false;
        button.success = true;

        resetTimer = setTimeout(() => {
          resetState();
        }, 2800);
      }, 2100);
    }

    function handleClick() {
      console.log('Click event will be handled here.')
      onSubmit()
    }

    return {
      initialState,
      resetState,
      onSubmit,
      button,
      resetTimer,
      handleClick
    }
  },
}
</script>

<style lang="scss" scoped>
.spinner {
  display: inline-block;
  margin: 0 8px;
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
  border: .215em solid transparent;
  vertical-align: middle;
  font-size: 16px;
  border-top-color: white;
  animation: spin 1s cubic-bezier(.55, .15, .45, .85) infinite;
}

.btn {
  min-width: 170px;
  min-height: 42px;
  padding: 0 14px;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-weight: 500;
  color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2),
  0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: background-color 120ms;
  overflow: hidden;

  &:focus {
    outline: none;
  }

  &:hover,
  &:focus {
    background-color: #7f9cf5;
  }

  &,
  &:active {
    background-color: #667eea;
  }

  svg {
    filter: drop-shadow(2px 3px 6px rgba(0, 0, 0, .4));
  }
}

.v-btn-label-enter-active {
  animation: slide-in-down 260ms cubic-bezier(.0, .0, .2, 1);
}

.v-btn-label-leave-active {
  animation: slide-out-down 260ms cubic-bezier(.4, .0, 1, 1);
}


@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes slide-in-down {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }

  50% {
    opacity: .8;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out-down {
  0% {
    transform: translateY(0);
    opacity: 1;
  }

  40% {
    opacity: .2;
  }

  100% {
    transform: translateY(20px);
    opacity: 0;
  }
}

</style>
