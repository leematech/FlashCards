<template>
  <div class="page container">
    <h1 class="text-center my-4">Create a Flashcard</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="front" class="form-label">Front Text</label>
        <textarea
          v-model="frontText"
          id="front"
          required
          rows="4"
          class="form-control"
          placeholder="Enter the front text here..."
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="back" class="form-label">Back Text</label>
        <textarea
          v-model="backText"
          id="back"
          required
          rows="4"
          class="form-control"
          placeholder="Enter the back text here..."
        ></textarea>
      </div>
      <button type="submit" class="btn btn-success w-100">Add Flashcard</button>
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
