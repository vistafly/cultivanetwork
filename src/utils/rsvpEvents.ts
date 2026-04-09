type RSVPListener = (eventId: string, attending: boolean) => void;

const listeners = new Set<RSVPListener>();

export const rsvpEvents = {
  subscribe(listener: RSVPListener) {
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  },

  emit(eventId: string, attending: boolean) {
    listeners.forEach(fn => fn(eventId, attending));
  },
};
