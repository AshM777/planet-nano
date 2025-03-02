import { promises as fs } from 'fs';
import path from 'path';

export interface Subscriber {
  email: string;
  subscribedAt: string;
}

const SUBSCRIBERS_FILE = path.join(process.cwd(), 'src/data/subscribers/subscribers.json');

interface SubscribersData {
  subscribers: Subscriber[];
}

async function initializeStore() {
  try {
    await fs.access(SUBSCRIBERS_FILE);
  } catch {
    await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify({ subscribers: [] }, null, 2));
  }
}

export async function getSubscribers(): Promise<Subscriber[]> {
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, 'utf-8');
    const { subscribers } = JSON.parse(data) as SubscribersData;
    return subscribers;
  } catch (error) {
    console.error('Error reading subscribers:', error);
    return [];
  }
}

export async function addSubscriber(email: string): Promise<boolean> {
  try {
    const subscribers = await getSubscribers();
    if (subscribers.some(s => s.email === email)) {
      return false;
    }

    const newSubscriber: Subscriber = {
      email,
      subscribedAt: new Date().toISOString()
    };

    await fs.writeFile(
      SUBSCRIBERS_FILE,
      JSON.stringify({ subscribers: [...subscribers, newSubscriber] }, null, 2)
    );
    return true;
  } catch (error) {
    console.error('Error adding subscriber:', error);
    return false;
  }
}

export async function removeSubscriber(email: string): Promise<boolean> {
  try {
    const subscribers = await getSubscribers();
    const filteredSubscribers = subscribers.filter(s => s.email !== email);
    
    if (filteredSubscribers.length === subscribers.length) {
      return false;
    }

    await fs.writeFile(
      SUBSCRIBERS_FILE,
      JSON.stringify({ subscribers: filteredSubscribers }, null, 2)
    );
    return true;
  } catch (error) {
    console.error('Error removing subscriber:', error);
    return false;
  }
}

// Initialize store on import
initializeStore().catch(console.error); 