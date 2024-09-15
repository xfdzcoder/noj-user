import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ExecuteInfo, ExecuteResult, QuestionInfo } from '@/api/question'

export const useQuestionStore = defineStore(
  'question',
  () => {

    const questionInfo = ref<QuestionInfo>({
      id: '1829045838811627522'
    } as QuestionInfo)
    const currentExecuteResult = ref<ExecuteResult>()
    const currentExecuteInfo = ref<ExecuteInfo>({
      languageType: 'java',
      codeText: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int a = scanner.nextInt();
        int b = scanner.nextInt();
        System.out.println(a + b);
    }
}
`
    } as ExecuteInfo)


    const isCodeQuestion = (questionType: number) => {
      return questionType === 4
    }

    const resolveQuestionType = (questionType: number) => {
      switch (questionType) {
        case 0:
          return '单选题'
        case 1:
          return '多选题'
        case 2:
          return '填空题'
        case 3:
          return '主观题'
        case 4:
          return '编程题'
        default:
          return '未知'
      }
    }

    const resolveDifficulty = (difficulty: number) => {
      switch (difficulty) {
        case 0:
          return '简单'
        case 1:
          return '中等'
        case 2:
          return '困难'
        default:
          return '未知'
      }
    }

    const resolveDifficultyTagType = (difficulty: number) => {
      switch (difficulty) {
        case 0:
          return 'success'
        case 1:
          return 'primary'
        case 2:
          return 'danger'
        default:
          return 'info'
      }
    }

    return {
      questionInfo,
      currentExecuteInfo,
      currentExecuteResult,

      resolveDifficulty,
      resolveDifficultyTagType,
      resolveQuestionType,
      isCodeQuestion
    }
  },
  {
    persist: true
  }
)
