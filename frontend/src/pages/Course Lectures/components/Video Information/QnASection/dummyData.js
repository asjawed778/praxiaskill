const dummyQuestions = [
    {
      id: 1,
      title: "How does React useState work?",
      description: "I want to understand how the useState hook functions internally.",
      author: "Alice",
      date: "2024-04-30",
      votes: 5,
      replies: [
        {
          id: 1,
          content: "It’s a hook that lets you add state to functional components.",
          author: "Bob",
          date: "2024-05-01",
          votes: 2
        }
      ]
    },
    {
      id: 2,
      title: "What's the difference between props and state?",
      description: "They both seem similar. When should I use what?",
      author: "Charlie",
      date: "2024-04-28",
      votes: 3,
      replies: []
    }
  ];
  
  export default dummyQuestions;
  