<template>
  <div>
    <h1>Create a Flashcard</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="front">Front Text</label>
        <input v-model="frontText" id="front" required />
      </div>
      <div>
        <label for="back">Back Text</label>
        <input v-model="backText" id="back" required />
      </div>
      <!-- Automatically set reviewDate and status, no user input for these -->
      <button type="submit">Add Flashcard</button>
    </form>
  </div>
</template>

<script>
import { flashcardStore } from '@/store'

export default {
  data() {
    return {
      frontText: '',
      backText: ''
    }
  },
  methods: {
    submitForm() {
      const flashcard = {
        front_text: this.frontText,
        back_text: this.backText
      }
      flashcardStore.addFlashcard(flashcard)
      this.resetForm()
    },
    resetForm() {
      this.frontText = ''
      this.backText = ''
    }
  }
}
</script>
