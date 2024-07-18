import { z } from 'zod'

export default function getAiPrompt(promptType: string, text: string, title: string) {
  let prompt
  let schema

  switch (promptType) {
    case 'Case':
      prompt = `Summarize the following United States legal court case in the following manner: Case Information (Parties, case or docket number but always reference it in your response as case number, court, jurisdiction, authoring judge or judges). Background Facts (summarize the facts in 5-6 sentences. Lower Court Holding (summarize what the prior or lower court held if the case is on appeal). Analysis (summarize the court opinion in 500 words). Court Holdings (summarize the important court holding or holdings of the opinion). Legal Case to Summarize: ${title} ${text}`

      schema = z.object({
        caseInformation: z.object({
          parties: z.object({
            plaintiffs: z.array(z.string()),
            defendants: z.array(z.string()),
          }),
          caseNumber: z.string(),
          jurisdiction: z.string(),
          court: z.string(),
          authoringJudges: z.array(z.string()),
        }),
        backgroundFacts: z.string(),
        lowerCourtHolding: z.string(),
        analysis: z.string(),
        courtHoldings: z.array(z.string()),
      })

      break
    case 'Complaint':
      prompt = `Summarize the following United States legal court Complaint in the following manner: Case Information (Parties, case or docket number but always reference it in your response as case number, court, jurisdiction, authoring attorney or attorneys). Background Facts (summarize the facts in 5-6 sentences. Supporting Case Law. State or Federal statutes or laws cited. All counts alleged along with the legal burdens associated with those counts, and what the Plaintiff must prove for each count alleged. Any possible defenses to all counts or possible issues with the complaint. Legal Complaint to Summarize: ${title} ${text}`

      schema = z.object({
        caseInformation: z.object({
          parties: z.object({
            plaintiffs: z.array(z.string()),
            defendants: z.array(z.string()),
          }),
          caseNumber: z.string(),
          jurisdiction: z.string(),
          court: z.string(),
          authoringCounsel: z.array(z.string()),
        }),
        backgroundFacts: z.string(),
        lowerCourtHolding: z.string(),
        analysis: z.string(),
        courtHoldings: z.array(z.string()),
      })
      break
    case 'Order':
      prompt = `Summarize the following United States legal court case in the following manner: Case Information (Parties, case or docket number but always reference it in your response as case number, court, jurisdiction, authoring judge or judges). Background Facts (summarize the facts in 5-6 sentences. Lower Court Holding (summarize what the prior or lower court held if the case is on appeal). Analysis (summarize the court order in 500 words). Court Holdings (summarize the important court holding or holdings of the opinion). Legal court Order to Summarize: ${title} ${text}`

      schema = z.object({
        caseInformation: z.object({
          parties: z.object({
            plaintiffs: z.array(z.string()),
            defendants: z.array(z.string()),
          }),
          caseNumber: z.string(),
          jurisdiction: z.string(),
          court: z.string(),
          authoringJudges: z.array(z.string()),
        }),
        backgroundFacts: z.string(),
        analysis: z.string(),
        courtHoldings: z.array(z.string()),
      })

      break
    case 'Brief':
      prompt = `Summarize the following United States legal court brief, including any cases cited, arguments, supporting facts, supporting case law, or any possible opposition to such arguments: ${title} ${text}`

      schema = z.object({
        caseInformation: z.object({
          parties: z.object({
            plaintiffs: z.array(z.string()),
            defendants: z.array(z.string()),
          }),
          caseNumber: z.string(),
          jurisdiction: z.string(),
          court: z.string(),
          authoringJudges: z.array(z.string()),
        }),
        backgroundFacts: z.string(),
        analysis: z.string(),
        caseLawCited: z.array(z.string()),
        courtHoldings: z.array(z.string()),
      })
      break
    case 'Answer':
      prompt = `Summarize the following United States legal court answer, including any cases cited, arguments, supporting facts, supporting case law, or any possible opposition to such arguments: ${title} ${text}`

      schema = z.object({
        caseInformation: z.object({
          parties: z.object({
            plaintiffs: z.array(z.string()),
            defendants: z.array(z.string()),
          }),
          caseNumber: z.string(),
          jurisdiction: z.string(),
          court: z.string(),
          authoringJudges: z.array(z.string()),
        }),
        backgroundFacts: z.string(),
        analysis: z.string(),
        caseLawCited: z.array(z.string()),
        courtHoldings: z.array(z.string()),
      })
      break
    case 'Motion':
      prompt = `Summarize the following United States legal court brief, including any cases cited, arguments, supporting facts, supporting case law, or any possible opposition to such arguments: ${title} ${text}`

      schema = z.object({
        caseInformation: z.object({
          parties: z.object({
            plaintiffs: z.array(z.string()),
            defendants: z.array(z.string()),
          }),
          caseNumber: z.string(),
          jurisdiction: z.string(),
          court: z.string(),
          authoringJudges: z.array(z.string()),
        }),
        backgroundFacts: z.string(),
        analysis: z.string(),
        caseLawCited: z.array(z.string()),
        courtHoldings: z.array(z.string()),
      })
      break
    case 'Opinion':
      prompt = `Summarize the following United States legal court opinion, including any cases cited, arguments, supporting facts, supporting case law, or any possible opposition to such arguments: ${title} ${text}`

      schema = z.object({
        caseInformation: z.object({
          parties: z.object({
            plaintiffs: z.array(z.string()),
            defendants: z.array(z.string()),
          }),
          caseNumber: z.string(),
          jurisdiction: z.string(),
          court: z.string(),
          authoringJudges: z.array(z.string()),
        }),
        backgroundFacts: z.string(),
        analysis: z.string(),
        caseLawCited: z.array(z.string()),
        courtHoldings: z.array(z.string()),
      })
      break
    case 'Response':
      prompt = `Summarize the following United States legal court response, including any cases cited, arguments, supporting facts, supporting case law, or any possible opposition to such arguments: ${title} ${text}`

      schema = z.object({
        caseInformation: z.object({
          parties: z.object({
            plaintiffs: z.array(z.string()),
            defendants: z.array(z.string()),
          }),
          caseNumber: z.string(),
          jurisdiction: z.string(),
          court: z.string(),
          authoringJudges: z.array(z.string()),
        }),
        backgroundFacts: z.string(),
        analysis: z.string(),
        caseLawCited: z.array(z.string()),
        courtHoldings: z.array(z.string()),
      })
      break
    case 'Witness List':
      prompt = `Summarize the following United States legal court witness list, including any cases cited, arguments, supporting facts, supporting case law, or any possible opposition to such arguments: ${title} ${text}`

      schema = z.object({
        caseInformation: z.object({
          parties: z.object({
            plaintiffs: z.array(z.string()),
            defendants: z.array(z.string()),
          }),
          caseNumber: z.string(),
          jurisdiction: z.string(),
          court: z.string(),
          authoringJudges: z.array(z.string()),
        }),
        backgroundFacts: z.string(),
        analysis: z.string(),
        caseLawCited: z.array(z.string()),
        courtHoldings: z.array(z.string()),
      })
      break
    case 'Witness':
      prompt = `Summarize the following United States legal court witness report, including any cases cited, arguments, supporting facts, supporting case law, or any possible opposition to such arguments: ${title} ${text}`

      schema = z.object({
        caseInformation: z.object({
          parties: z.object({
            plaintiffs: z.array(z.string()),
            defendants: z.array(z.string()),
          }),
          caseNumber: z.string(),
          jurisdiction: z.string(),
          court: z.string(),
          authoringJudges: z.array(z.string()),
        }),
        backgroundFacts: z.string(),
        analysis: z.string(),
        caseLawCited: z.array(z.string()),
        courtHoldings: z.array(z.string()),
      })
      break
    case 'Misc':
      prompt = `Summarize the following United States legal court document, including any cases cited, arguments, supporting facts, supporting case law, or any possible opposition to such arguments: ${title} ${text}`

      schema = z.object({
        caseInformation: z.object({
          parties: z.object({
            plaintiffs: z.array(z.string()),
            defendants: z.array(z.string()),
          }),
          caseNumber: z.string(),
          jurisdiction: z.string(),
          court: z.string(),
          authoringJudges: z.array(z.string()),
        }),
        backgroundFacts: z.string(),
        analysis: z.string(),
        caseLawCited: z.array(z.string()),
        courtHoldings: z.array(z.string()),
      })
      break
    case 'Exhibit List':
      prompt = `Summarize the following United States legal court exhibit list, including any cases cited, arguments, supporting facts, supporting case law, or any possible opposition to such arguments: ${title} ${text}`

      schema = z.object({
        caseInformation: z.object({
          parties: z.object({
            plaintiffs: z.array(z.string()),
            defendants: z.array(z.string()),
          }),
          caseNumber: z.string(),
          jurisdiction: z.string(),
          court: z.string(),
          authoringJudges: z.array(z.string()),
        }),
        backgroundFacts: z.string(),
        analysis: z.string(),
        caseLawCited: z.array(z.string()),
        courtHoldings: z.array(z.string()),
      })
      break
    case 'Exhibit':
      prompt = `Summarize the following United States legal court exhibit, including any cases cited, arguments, supporting facts, supporting case law, or any possible opposition to such arguments: ${title} ${text}`

      schema = z.object({
        caseInformation: z.object({
          parties: z.object({
            plaintiffs: z.array(z.string()),
            defendants: z.array(z.string()),
          }),
          caseNumber: z.string(),
          jurisdiction: z.string(),
          court: z.string(),
          authoringJudges: z.array(z.string()),
        }),
        backgroundFacts: z.string(),
        analysis: z.string(),
        caseLawCited: z.array(z.string()),
        courtHoldings: z.array(z.string()),
      })
      break
    case 'Schedule':
      prompt = `Summarize the following United States legal court schedule or scheduling order, including any cases cited, arguments, supporting facts, supporting case law, or any possible opposition to such arguments. Provide a list of all dates and deadlines, with a checklist to ensure nothing gets missed: ${title} ${text}`

      schema = z.object({
        caseInformation: z.object({
          parties: z.object({
            plaintiffs: z.array(z.string()),
            defendants: z.array(z.string()),
          }),
          caseNumber: z.string(),
          jurisdiction: z.string(),
          court: z.string(),
          authoringJudges: z.array(z.string()),
        }),
        backgroundFacts: z.string(),
        analysis: z.string(),
        checklist: z.array(z.string()),
        caseLawCited: z.array(z.string()),
        courtHoldings: z.array(z.string()),
      })
      break
    default:
      prompt = `Summarize the following United States legal court document: ${title} ${text}`

      schema = z.object({
        caseInformation: z.object({
          parties: z.object({
            plaintiffs: z.array(z.string()),
            defendants: z.array(z.string()),
          }),
          caseNumber: z.string(),
          jurisdiction: z.string(),
          court: z.string(),
          authoringJudges: z.array(z.string()),
        }),
        backgroundFacts: z.string(),
        lowerCourtHolding: z.string(),
        analysis: z.string(),
        courtHoldings: z.array(z.string()),
      })
  }

  return { prompt, schema }
}
