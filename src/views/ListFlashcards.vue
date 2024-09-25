<template>
  <div>
    <h1>Review Flashcards</h1>

    <div v-if="currentFlashcard">
      <strong>{{ currentFlashcard.front_text }}</strong> - {{ currentFlashcard.back_text }}
      <br />
      Status: {{ currentFlashcard.status }} | Review Date:
      {{ currentFlashcard.reviewDate.toLocaleDateString() }}

      <div>
        <button @click="markAsPerfect">Perfect</button>
        <button @click="markAsTryAgain">Try Again</button>
      </div>
    </div>
    <p v-else>No more flashcards to review today.</p>
  </div>
</template>

<script>
import { flashcardStore } from '@/store'

export default {
  setup() {
    return { flashcardStore }
  },
  computed: {
    filteredFlashcards() {
      return this.flashcardStore.flashcards.filter((flashcard) =>
        this.isTodayOrBefore(flashcard.reviewDate)
      )
    },
    currentFlashcard() {
      // Select a random flashcard from the filtered list
      if (this.filteredFlashcards.length === 0) return null
      const randomIndex = Math.floor(Math.random() * this.filteredFlashcards.length)
      return this.filteredFlashcards[randomIndex]
    }
  },
  methods: {
    isTodayOrBefore(date) {
      const today = new Date()
      today.setHours(0, 0, 0, 0) // Set time to midnight to compare only date
      date.setHours(0, 0, 0, 0) // Ensure reviewDate also ignores time
      return date <= today
    },
    markAsPerfect() {
      if (this.currentFlashcard) {
        this.updateFlashcard(this.currentFlashcard, 'perfect')
      }
    },
    markAsTryAgain() {
      if (this.currentFlashcard) {
        this.updateFlashcard(this.currentFlashcard, 'tryAgain')
      }
    },
    updateFlashcard(flashcard, action) {
      const currentDate = new Date()
      let daysToAdd
      let newStatus

      if (action === 'perfect') {
        switch (flashcard.status) {
          case 0:
            daysToAdd = 1
            newStatus = 1
            break
          case 1:
            daysToAdd = 2
            newStatus = 2
            break
          case 2:
            daysToAdd = 4
            newStatus = 4
            break
          case 4:
            daysToAdd = 8
            newStatus = 8
            break
          case 8:
            daysToAdd = 365 * 100 // 100 years
            newStatus = 16
            break
          default:
            break
        }
      } else if (action === 'tryAgain') {
        daysToAdd = 1 // Try again tomorrow
        newStatus = 0 // Reset status to 0
      }

      flashcard.reviewDate = new Date(currentDate.setDate(currentDate.getDate() + daysToAdd))
      flashcard.status = newStatus

      this.flashcardStore.saveToLocalStorage() // Save updates to localStorage immediately

      // Refresh current flashcard to show a new one after an action
      this.$forceUpdate()
    }
  }
}
</script>
