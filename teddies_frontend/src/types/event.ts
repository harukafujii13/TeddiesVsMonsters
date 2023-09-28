// TODO: must replace dummy data type
export type EventType = {
  id: string;
  attributes: {
    title: string;
    place: string;
    address: string;
    date: string;
    description?: string;
    image?: string;
    end: boolean;
    mvps: {
      data: MvpType[];
    };
  };
};

export type MvpType = {
  id: string;
  attributes: {
    name: string;
    rank: 'first' | 'second' | 'third';
    country: string;
    age: number;
    time_played: number;
    favorite: string;
    comment: string;
    image?: string;
    event: string;
  };
};
