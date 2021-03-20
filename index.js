const DEFAULT_OPTIONS = {
  urlFilter: (url) => url,
  onFireSuccess: (body) => {},
  onFireError: (err) => {}
};

export default function createStats(
  domain = '',
  statOptions = {}
) {
  const options = {
    ...DEFAULT_OPTIONS,
    statOptions
  };

  if (!domain) {
    return console.warn('Domain required to setup stats');
  }

  return {
    async fire(eventName) {
      if (!eventName) {
        const error = new Error('`eventName` is required to fire stat');

        options.onFireError(error);
        return console.warn(error.message);
      }

      const url = window.location.href;
      const referrer = document.referrer
        ? options.urlFilter(document.referrer)
        : null;

      const body = {
        n: eventName,
        u: options.urlFilter(url),
        d: domain,
        r: referrer,
        w: window.innerWidth
      };

      try {
        await fetch('https://plausible.io/api/event', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'text/plain'
          }
        });

        options.onFireSuccess(body);
      } catch (err) {
        options.onFireError(err);
      }
    }
  };
}
