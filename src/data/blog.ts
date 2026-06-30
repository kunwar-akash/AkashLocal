export interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  category: string;
  tags: string[];
  coverColor: string;
  content: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'testing-non-deterministic-ai-systems',
    title: "How to Test AI Systems That Don't Have Predictable Outputs",
    excerpt:
      "Traditional regression testing breaks on probabilistic AI. Here's the boundary-value approach I developed at VeriHire to validate AI systems that can't return the same result twice.",
    date: '2026-06-05',
    readTime: 6,
    category: 'Engineering',
    tags: ['AI Testing', 'QA', 'Boundary Testing', 'Probabilistic Systems', 'VeriHire'],
    coverColor: '#a855f7',
    content: [
      {
        paragraphs: [
          "At VeriHire, I ran into a problem that most QA frameworks weren't designed for: how do you test an AI system that produces different outputs for the same input?",
          "VeriHire's core feature was AI-driven candidate screening — an algorithm that scored and ranked candidates based on resume content, job requirements, and behavioral signals. The algorithm was probabilistic. Run it twice with the same candidate and job, you might get 87% one time and 84% the next. Traditional regression testing — 'expected output: 87.3%' — was completely useless.",
        ],
      },
      {
        heading: 'Why Traditional Testing Fails on AI',
        paragraphs: [
          "Regression testing assumes determinism. You have an input, you know the correct output, you run the test, you check if the output matches. This works perfectly for a function that adds two numbers or a REST API that returns a user record.",
          "It fails catastrophically on probabilistic systems. If your 'expected output' is a specific score, your test will fail randomly — not because the AI is wrong, but because you're testing the wrong thing. You're measuring variance, not correctness.",
          "The deeper problem: when tests fail randomly, engineers stop trusting them. They get marked as flaky, disabled, or ignored. You lose the entire value of automated testing.",
        ],
      },
      {
        heading: 'The Boundary-Value Approach',
        paragraphs: [
          "The shift I made: instead of testing for exact outputs, test for behavioral consistency across ranges. The AI should reliably place clearly qualified candidates above clearly unqualified ones. A candidate who meets 9 out of 10 job criteria should consistently score higher than a candidate who meets 3 out of 10.",
          "This led to a partition-based testing strategy. I identified equivalence classes — groups of candidates who should behave similarly — and tested relative ranking, not absolute scores.",
          "Highly qualified candidate (8+ criteria met) → should consistently be in top 25% of ranking",
          "Borderline candidate (5-6 criteria met) → acceptable anywhere in 35-70% range",
          "Unqualified candidate (1-2 criteria met) → should consistently be in bottom 25%",
        ],
      },
      {
        heading: 'How I Identified the Boundary Conditions',
        paragraphs: [
          "The critical test cases were the boundary candidates — those sitting right at the threshold between 'shortlisted' and 'not shortlisted'. For VeriHire, this was around the 60% confidence threshold that triggered automatic shortlisting.",
          "I designed candidates specifically crafted to sit just above (62%) and just below (58%) this threshold. These 'boundary candidates' needed to behave predictably — the above-threshold candidate should usually shortlist, the below-threshold candidate should usually not.",
          "I say 'usually' deliberately. For a probabilistic system, 100% consistency at exact threshold values is an unrealistic requirement. I defined acceptable behavior as 'correct classification >85% of the time across 20 runs' for boundary cases.",
        ],
      },
      {
        heading: 'What This Caught',
        paragraphs: [
          "Two weeks before a major enterprise client onboarding, boundary testing caught a regression in the shortlisting logic. A change to the scoring weights had shifted the effective threshold from ~60% to ~52% — meaning candidates who should have been rejected were being shortlisted.",
          "Exact-match regression testing would have caught nothing, because the absolute scores changed predictably. Boundary testing caught it, because candidates designed to be just below the shortlist threshold were now appearing above it.",
          "The defect was fixed before any client saw it. That's the value of testing the right property of the system.",
        ],
      },
      {
        heading: 'Key Principles',
        paragraphs: [
          "Test behavior, not values. Ask 'is this system making correct decisions?' not 'is this system returning this exact number?'",
          "Design test data to probe boundaries deliberately. Don't use random inputs — construct inputs that target the decision thresholds you care about.",
          "Define acceptable variance explicitly. 'This test passes if the result is in range X' is a valid and valuable test. Don't avoid it because it feels imprecise.",
          "Test relative ordering, not absolute scores. Rankings are more stable than absolute values for most AI systems.",
        ],
      },
    ],
  },
  {
    slug: 'api-first-testing-strategy',
    title: 'Why I Stopped Testing UI First and What Changed',
    excerpt:
      "UI-first testing is slow, expensive, and often tests the wrong thing. Here's the API-first strategy I built at EarthLink that shifted defect detection from days after deployment to hours before it.",
    date: '2026-05-20',
    readTime: 5,
    category: 'Engineering',
    tags: ['API Testing', 'EarthLink', 'Postman', 'Strategy', 'Microservices'],
    coverColor: '#3b82f6',
    content: [
      {
        paragraphs: [
          "Early in my work on EarthLink's platform, I noticed a pattern: UI bugs that took 3 hours to reproduce and diagnose were actually API contract failures that would have taken 10 minutes to catch. The UI was a 5-layer stack on top of the actual failure.",
          "I switched to API-first testing. Here's what that means and why it matters.",
        ],
      },
      {
        heading: 'The Problem with UI-First Testing',
        paragraphs: [
          "When you test UI first, you're testing at the furthest possible point from the failure. A provisioning error in a microservice shows up as a button that doesn't respond, or a page that loads with no data, or an error message that says 'something went wrong'. Now you have to trace backward through the entire stack to find out what actually failed.",
          "For a platform like EarthLink — spanning broadband, fiber, and mobile services across provisioning, billing, and account management microservices — that trace could cross 4-5 service boundaries. Hours of investigation to find a one-line API contract mismatch.",
          "There's a second problem: UI tests are slow. A full regression suite through the UI might take 6-8 hours. API tests covering the same functional surface take 45 minutes. Speed matters in weekly release cycles.",
        ],
      },
      {
        heading: 'What API-First Testing Looks Like',
        paragraphs: [
          "API-first doesn't mean you never test the UI. It means you validate the API layer first — before the UI layer — and treat API tests as your primary regression gate.",
          "For EarthLink, this meant building Postman collections that directly called the provisioning, billing, and account management APIs in sequence, the same way the UI would — but without the UI. A subscription activation flow became: authenticate → call provisioning API → validate response → call billing API → validate response → call account management API → verify state.",
          "The key word is 'validate'. Not just 'call and check 200'. Validate the response structure, validate the data values, validate the state changes in the database (via separate SQL queries), validate the downstream effects on dependent services.",
        ],
      },
      {
        heading: 'How I Built the Collections',
        paragraphs: [
          "Each Postman collection was built around a complete business flow, not individual endpoints. 'Activate new broadband subscription' is a test. 'POST /api/provision' is not.",
          "I used Postman environment variables to parameterize everything: test account credentials, environment URLs, expected plan IDs. The same collection ran against dev, staging, and production environments with a single environment switch.",
          "Pre-request scripts handled authentication token management. Post-response scripts validated the response and stored values for the next request in the chain. Tests checked: status codes, required fields present, no null values where values were expected, response time under threshold.",
        ],
      },
      {
        heading: 'Results',
        paragraphs: [
          "The shift was measurable within three sprint cycles. API-layer defects that previously appeared in production (found by users or customer support) started getting caught in staging — because staging ran the full API collection before every deployment.",
          "Integration failures that previously took 2-3 hours to diagnose dropped to 15-20 minutes because the failing API call was immediately visible in the collection run results.",
          "The overall defect escape rate dropped roughly 40% over the following releases. Not all from API-first testing — but a significant portion from catching integration failures before they reached UI testing at all.",
        ],
      },
      {
        heading: 'How to Start',
        paragraphs: [
          "If you want to implement API-first testing, start with your highest-risk user flows. Pick the 3 flows that, if broken, would cause the most customer impact. Build API collections for those first.",
          "Don't try to boil the ocean. A collection that covers 3 critical flows and runs reliably in CI is worth more than a theoretical 100-flow collection that nobody maintains.",
          "Make API tests a required gate before UI testing begins. Not optional, not 'nice to have'. If the API collection fails, UI testing doesn't start. This is the cultural shift that makes it stick.",
        ],
      },
    ],
  },
];
