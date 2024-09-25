<template>
  <div class="flashcard-review d-flex flex-column align-items-center justify-content-center">
    <template v-if="currentFlashcard">
      <div class="flashcard" @click="flipCard" :class="{ flipped: isFlipped }">
        <div class="card-inner">
          <div class="card-front">
            <strong>{{ currentFlashcard.front_text }}</strong>
          </div>
          <div class="card-back">
            <strong>{{ currentFlashcard.back_text }}</strong>
          </div>
        </div>
      </div>

      <div class="button-container mt-3 d-flex flex-column align-items-center">
        <button class="btn btn-success w-75 mb-2" @click.stop="markAsPerfect">Perfect</button>
        <button class="btn btn-danger w-75" @click.stop="markAsTryAgain">Try Again</button>
      </div>
    </template>
    <p v-else>No more flashcards to review today.</p>
  </div>
</template>

<script>
import { flashcardStore } from '@/store'
import { ref } from 'vue'

export default {
  setup() {
    const isFlipped = ref(false)
    const flashcardStoreInstance = flashcardStore

    function flipCard() {
      isFlipped.value = !isFlipped.value
    }

    return {
      flashcardStore: flashcardStoreInstance,
      isFlipped,
      flipCard
    }
  },
  computed: {
    filteredFlashcards() {
      return this.flashcardStore.flashcards.filter((flashcard) =>
        this.isTodayOrBefore(flashcard.reviewDate)
      )
    },
    currentFlashcard() {
      if (this.filteredFlashcards.length === 0) return null
      const randomIndex = Math.floor(Math.random() * this.filteredFlashcards.length)
      return this.filteredFlashcards[randomIndex]
    }
  },
  methods: {
    isTodayOrBefore(date) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      date.setHours(0, 0, 0, 0)
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

      this.flashcardStore.saveToLocalStorage()

      this.$forceUpdate()
      this.isFlipped.value = false // Reset card flip state
    }
  }
}
</script>

<style scoped>
.flashcard-review {
  height: 100vh; /* Full viewport height */
  padding: 16px; /* Padding for content */
}

.flashcard {
  width: 300px; /* Width of the flashcard */
  height: 200px; /* Height of the flashcard */
  perspective: 1000px; /* Perspective effect for the flip */
  margin-bottom: 20px; /* Space below the flashcard */
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s; /* Smooth flip animation */
  transform-style: preserve-3d; /* Preserve 3D effect */
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; /* Hide back when facing front */
  display: flex;
  align-items: center; /* Center content vertically */
  justify-content: center; /* Center content horizontally */
  font-size: 20px; /* Font size for card text */
  border: 1px solid #ccc; /* Border style */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Shadow for depth */
  padding: 16px; /* Padding for card content */
}

.card-front {
  background-color: #f9f9f9; /* Background color for front */
}

.card-back {
  background-color: #ffffff; /* Background color for back */
  transform: rotateY(180deg); /* Rotate back face */
}

.flipped .card-inner {
  transform: rotateY(180deg); /* Flip the card */
}

.button-container {
  width: 100%; /* Ensure the button container takes full width */
}
</style>
