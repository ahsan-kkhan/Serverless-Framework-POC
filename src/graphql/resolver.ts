module.exports.resolvers = {
    Query: {
      getOrders: (_, args) => {
        const orders = [
          {
            id: '1977',
            amount: 10.0,
            tax: 0.5,
            total: 10.5,
          },
          {
            id: '1978',
            amount: 20.0,
            tax: 1.0,
            total: 21.0,
          },
          {
            id: '1979',
            amount: 30.0,
            tax: 1.5,
            total: 31.5,
          },
        ];
  
        return orders;
      },
    },
  };