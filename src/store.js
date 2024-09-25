import { reactive, watch } from 'vue'

const initialFlashCards =
  JSON.parse(localStorage.getItem('flashCards'), (key, value) => {
    // Parse the reviewDate from localStorage back into a Date object
    if (key === 'reviewDate') return new Date(value)
    return value
  }) || []

export const flashcardStore = reactive({
  flashcards: initialFlashCards,

  addFlashcard(flashcard) {
    const newFlashcard = {
      ...flashcard,
      reviewDate: new Date(),
      status: 0
    }

    newFlashcard.reviewDate.setHours(0, 0, 0, 0)

    this.flashcards.push(newFlashcard)
    this.saveToLocalStorage()
  },

  saveToLocalStorage() {
    localStorage.setItem('flashCards', JSON.stringify(this.flashcards))
  }
})

watch(
  () => flashcardStore.flashcards,
  () => flashcardStore.saveToLocalStorage(),
  { deep: true }
)
