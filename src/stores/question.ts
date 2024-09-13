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


    return {
      questionInfo,
      currentExecuteInfo,
      currentExecuteResult
    }
  },
  {
    persist: true
  }
)
