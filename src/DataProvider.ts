export interface IFlight {
  origin: string
  flight: string
  arrival: string
  state: string
}

export function getInitialFlightData(): IFlight[] {
  return [
    {
      origin: "London",
      flight: "A123",
      arrival: "08:15",
      state: ""
    },
    {
      origin: "Berlin",
      flight: "D654",
      arrival: "08:45",
      state: ""
    },
    {
      origin: "New York",
      flight: "U213",
      arrival: "09:05",
      state: ""
    },
    {
      origin: "Buenos Aires",
      flight: "A987",
      arrival: "09:30",
      state: ""
    },
    {
      origin: "Rome",
      flight: "I768",
      arrival: "10:10",
      state: ""
    },
    {
      origin: "Tokyo",
      flight: "G119",
      arrival: "10:35",
      state: ""
    }
  ];
}