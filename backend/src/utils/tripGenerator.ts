import { GoogleGenerativeAI } from "@google/generative-ai";
import { TripInput } from "../sharedTypes";

const apiKey = process.env.GEMINI_API_KEY as string;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: { responseMimeType: "application/json" },
});

export async function generateTrip(prompt: TripInput): Promise<string> {
  try {
    // Costruzione del prompt con template string
    const request = `
      Generate a detailed trip itinerary in JSON format for the following prompt: 
      {
        'city': '${prompt.city}',
        'daysNumber': ${prompt.days},
        'description': 'Brief description of the city.',
        'history': 'Brief historical background of the city.',
        'itinerary': [
          {
            'day': 'Day 1: Title for the first day',
            'parts': [
              {
                'activities': [
                  {
                    'placeName': 'Name of the place',
                    'placeDescription': 'Description of the place'
                  },
                  {
                    'placeName': 'Name of another place',
                    'placeDescription': 'Description of this place'
                  },
                  {
                    'placeName': 'Name of another place',
                    'placeDescription': 'Description of this place'
                  }
                ]
              },
              {
                'activities': [
                  {
                    'placeName': 'Name of the place',
                    'placeDescription': 'Description of the place'
                  },
                  {
                    'placeName': 'Name of another place',
                    'placeDescription': 'Description of this place'
                  },
                  {
                    'placeName': 'Name of another place',
                    'placeDescription': 'Description of this place'
                  }
                ]
              }
            ]
          },
          // Ripeti blocchi simili per ogni giorno del viaggio
        ]
      }
      
      Ensure that the JSON follows this format exactly and that each field is filled out with realistic data. Use single quotes for strings, and ensure the JSON is valid and complete.
    `;

    // Invio della richiesta al modello generativo
    const result = await model.generateContent(request);

    // Recupera il testo della risposta senza controllare response.ok o response.status
    const text = await result.response.text();
    return text;
  } catch (error) {
    // Stampa l'errore completo per il debug
    console.error("Error generating content:", error);
    throw new Error(
      "Failed to generate trip itinerary. Please check the prompt or API settings."
    );
  }
}
