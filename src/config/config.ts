import { ConversationNode } from "../pages/HomePage";

export const baseURL = "http://localhost:4000";
export const features = [
  {
    id: 1,
    text: "Click to start conversation",
    userText: "How may I help You?",
    emoji: "🏁",
  },
  {
    id: 2,
    text: "What can ChatGPT Do?",
    userText:
      "GPT, or Generative Pre-trained Transformer, is an advanced AI language model capable of understanding and generating human-like text. It can perform a wide range of tasks, including answering questions, providing detailed explanations, translating languages, summarizing content, assisting with writing, and even creating code. GPT can engage in creative tasks like writing stories, composing emails, and brainstorming ideas. Additionally, it can support technical activities such as debugging, generating documentation, or offering step-by-step guides. Its versatility makes it a powerful tool for learning, productivity, and creative exploration across various fields.",
    emoji: "🤖",
  },
  {
    id: 3,
    text: "Find a Photo of the Decade",
    userText: "This bot cannot show pictures at this time. Coming soon!",
    emoji: "📸",
  },
  {
    id: 4,
    text: "Write a Business Analysis Report",
    userText:
      "This Business Analysis Report evaluates the current operational efficiency and market position of XYZ Corporation. Key findings indicate a steady revenue growth of 8% over the last quarter, driven by an expanded product line and enhanced marketing strategies. However, customer retention has declined by 5%, signaling a need for improved after-sales service. Cost analysis reveals rising production expenses due to supply chain disruptions. Recommendations include investing in automation to lower costs, optimizing customer support processes, and exploring new markets to sustain growth. Immediate action on these fronts can bolster competitiveness and ensure long-term profitability.",
    emoji: "📄",
  },
];

export const dummyConversationTree: ConversationNode = {
  question: "Welcome to Our Business! How can I assist you today?",
  answer: "Thank you for reaching out! Let me know what you need help with.",
  options: {
    option1: {
      question: "I'd like to know about your services.",
      answer:
        "We offer a variety of services tailored to meet our clients' needs.",
      options: {
        option1_1: {
          question:
            "Would you like to know about consulting or support services?",
          answer: "We have both consulting and support services available.",
          options: {
            consulting: {
              question:
                "Our consulting services include strategy and planning.",
              answer:
                "Would you like to schedule a consultation or know more about our offerings?",
              options: {
                schedule: {
                  question: "When would you like to schedule it?",
                  answer: "Let me know your preferred date and time.",
                  options: {},
                },
                details: {
                  question: "Our consulting services focus on various areas.",
                  answer: "Do you have a specific area in mind?",
                  options: {
                    strategy: {
                      question:
                        "Our strategy services help in market positioning.",
                      answer: "Would you like to discuss specific strategies?",
                      options: {
                        marketResearch: {
                          question:
                            "Market research is crucial for informed decisions.",
                          answer: "Do you need help with a specific market?",
                          options: {},
                        },
                        competitorAnalysis: {
                          question: "Competitor analysis can give you an edge.",
                          answer:
                            "Would you like to analyze specific competitors?",
                          options: {},
                        },
                      },
                    },
                    operations: {
                      question:
                        "Our operational consulting can enhance efficiency.",
                      answer: "Are you interested in process optimization?",
                      options: {
                        processMapping: {
                          question:
                            "Process mapping helps identify bottlenecks.",
                          answer:
                            "Would you like to start with a specific process?",
                          options: {},
                        },
                        resourceManagement: {
                          question:
                            "Effective resource management boosts productivity.",
                          answer: "Do you want tips on resource allocation?",
                          options: {},
                        },
                      },
                    },
                  },
                },
              },
            },
            support: {
              question:
                "Our support services include technical and customer support.",
              answer: "How can I assist you further?",
              options: {
                technical: {
                  question: "What technical issue are you facing?",
                  answer: "I'm here to help with any technical problem.",
                  options: {
                    softwareIssue: {
                      question: "What software are you having issues with?",
                      answer: "Please provide the software name and issue.",
                      options: {},
                    },
                    hardwareIssue: {
                      question: "What hardware issue are you experiencing?",
                      answer:
                        "Let me know the details of the hardware problem.",
                      options: {},
                    },
                  },
                },
                customerService: {
                  question: "What would you like assistance with?",
                  answer: "Let me know how I can assist you.",
                  options: {
                    feedback: {
                      question: "We value your feedback.",
                      answer: "What would you like to share with us?",
                      options: {},
                    },
                    generalInquiry: {
                      question: "What general inquiry do you have?",
                      answer: "Please specify your question or concern.",
                      options: {},
                    },
                  },
                },
              },
            },
          },
        },
        option1_2: {
          question: "Would you like to know about our pricing?",
          answer: "Our pricing varies based on the service chosen.",
          options: {
            pricingOverview: {
              question:
                "Would you like a general overview or specific details?",
              answer: "Here's what you need to know about our pricing.",
              options: {
                general: {
                  question: "Our services start at $99.",
                  answer: "Would you like to know more?",
                  options: {
                    packages: {
                      question: "We have several packages available.",
                      answer:
                        "Would you like to know the details of each package?",
                      options: {},
                    },
                    discounts: {
                      question: "We occasionally offer discounts.",
                      answer:
                        "Would you like to know about current promotions?",
                      options: {},
                    },
                  },
                },
                specific: {
                  question:
                    "Please specify which service you want pricing for.",
                  answer:
                    "I'll provide you with detailed pricing based on your selection.",
                  options: {
                    consulting: {
                      question: "Consulting services start at $199.",
                      answer:
                        "Would you like details on specific consulting services?",
                      options: {
                        strategy: {
                          question: "Strategy consulting is $299.",
                          answer:
                            "Would you like to proceed with a consultation?",
                          options: {},
                        },
                        operations: {
                          question: "Operations consulting is $249.",
                          answer: "Would you like more details?",
                          options: {},
                        },
                      },
                    },
                    support: {
                      question: "Support services start at $99 per hour.",
                      answer:
                        "Would you like to know more about support plans?",
                      options: {
                        hourly: {
                          question: "Our hourly rate is $99.",
                          answer: "Would you like to purchase support hours?",
                          options: {},
                        },
                        monthly: {
                          question: "Our monthly plan is $499.",
                          answer: "Would you like to subscribe to this plan?",
                          options: {},
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    option2: {
      question: "I have a question about pricing.",
      answer: "Our pricing depends on the service you choose.",
      options: {
        overview: {
          question: "Would you like a general overview or specific details?",
          answer: "Here's what you need to know about our pricing.",
          options: {
            general: {
              question: "Our services start at $99.",
              answer: "Would you like to know more?",
              options: {
                packages: {
                  question: "We have several packages available.",
                  answer: "Would you like to know the details of each package?",
                  options: {},
                },
                discounts: {
                  question: "We occasionally offer discounts.",
                  answer: "Would you like to know about current promotions?",
                  options: {},
                },
              },
            },
            specific: {
              question: "Please specify which service you want pricing for.",
              answer:
                "I'll provide you with detailed pricing based on your selection.",
              options: {
                consulting: {
                  question: "Consulting services start at $199.",
                  answer:
                    "Would you like details on specific consulting services?",
                  options: {
                    strategy: {
                      question: "Strategy consulting is $299.",
                      answer: "Would you like to proceed with a consultation?",
                      options: {},
                    },
                    operations: {
                      question: "Operations consulting is $249.",
                      answer: "Would you like more details?",
                      options: {},
                    },
                  },
                },
                support: {
                  question: "Support services start at $99 per hour.",
                  answer: "Would you like to know more about support plans?",
                  options: {
                    hourly: {
                      question: "Our hourly rate is $99.",
                      answer: "Would you like to purchase support hours?",
                      options: {},
                    },
                    monthly: {
                      question: "Our monthly plan is $499.",
                      answer: "Would you like to subscribe to this plan?",
                      options: {},
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    option3: {
      question: "I need technical support.",
      answer: "What technical issue are you experiencing?",
      options: {
        hardware: {
          question: "What hardware issue are you facing?",
          answer: "Let me know the details of the hardware problem.",
          options: {
            computer: {
              question: "What issue are you facing with your computer?",
              answer: "Please provide details about the issue.",
              options: {},
            },
            printer: {
              question: "What issue are you facing with your printer?",
              answer: "Please describe the problem you're experiencing.",
              options: {},
            },
          },
        },
        software: {
          question: "What software issue are you encountering?",
          answer: "Please provide the software name and the issue.",
          options: {
            installation: {
              question: "What software are you trying to install?",
              answer: "Please share any error messages you're seeing.",
              options: {},
            },
            crashing: {
              question: "What software is crashing?",
              answer: "Let me know your system specifications.",
              options: {},
            },
          },
        },
      },
    },
    option4: {
      question: "I'd like to give feedback.",
      answer: "We appreciate your feedback! What would you like to share?",
      options: {
        positive: {
          question: "Thank you for the positive feedback!",
          answer: "Can you specify what you liked?",
          options: {},
        },
        negative: {
          question: "We're sorry to hear that.",
          answer: "Can you specify what went wrong?",
          options: {},
        },
        suggestions: {
          question: "We welcome suggestions for improvement.",
          answer: "What would you suggest?",
          options: {},
        },
      },
    },
  },
};
