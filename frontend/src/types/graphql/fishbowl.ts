

export interface CreateFishbowlOptions {
  variables: {
    input: {
      name: string;
      description: string;
      startDateTime: string;
      timezone: string;
      duration: string;
      locale: string;
      hasIntroduction: boolean;
      isFishbowlNow: boolean;
    };
  };
}

export interface UpdateFishbowlOptions {
  variables: {
    input: {
      id: string;
      name?: string;
      description?: string;
      startDateTime?: string;
      timezone?: string;
      duration?: string;
      locale?: string;
      hasIntroduction?: boolean;
      isFishbowlNow?: boolean;
    };
  };
}
