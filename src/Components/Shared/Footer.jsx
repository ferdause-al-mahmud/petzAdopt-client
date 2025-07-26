const Footer = () => {
  return (
    <footer className="bg-rose-100 !text-rose-900 p-10 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h6 className="text-xl font-bold mb-4">PetzAdopt</h6>
          <p>Helping pets find loving homes. Every tail wag matters.</p>
          <p className="mt-2 text-sm">
            © {new Date().getFullYear()} PetzAdopt. All rights reserved.
          </p>
        </div>
        <div>
          <h6 className="text-lg font-semibold mb-3">Adopt</h6>
          <ul className="space-y-2">
            <li>
              <a className="hover:underline" href="#">
                Available Pets
              </a>
            </li>
            <li>
              <a className="hover:underline" href="#">
                How to Adopt
              </a>
            </li>
            <li>
              <a className="hover:underline" href="#">
                Success Stories
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="text-lg font-semibold mb-3">Donate</h6>
          <ul className="space-y-2">
            <li>
              <a className="hover:underline" href="#">
                Make a Donation
              </a>
            </li>
            <li>
              <a className="hover:underline" href="#">
                Sponsor a Pet
              </a>
            </li>
            <li>
              <a className="hover:underline" href="#">
                Fundraising Events
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="text-lg font-semibold mb-3">Connect</h6>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook">
              <svg
                className="w-6 h-6 fill-current hover:text-rose-600"
                viewBox="0 0 24 24"
              >
                <path d="M9 8H6v4h3v12h5V12h3.642l.358-4H14V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg
                className="w-6 h-6 fill-current hover:text-rose-600"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.2c3.2 0 3.6.012 4.85.07 1.17.054 1.97.24 2.43.4a4.92 4.92 0 0 1 1.76 1.02 4.92 4.92 0 0 1 1.02 1.76c.16.46.346 1.26.4 2.43.058 1.25.07 1.65.07 4.85s-.012 3.6-.07 4.85c-.054 1.17-.24 1.97-.4 2.43a4.92 4.92 0 0 1-1.02 1.76 4.92 4.92 0 0 1-1.76 1.02c-.46.16-1.26.346-2.43.4-1.25.058-1.65.07-4.85.07s-3.6-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.4a4.92 4.92 0 0 1-1.76-1.02 4.92 4.92 0 0 1-1.02-1.76c-.16-.46-.346-1.26-.4-2.43C2.212 15.6 2.2 15.2 2.2 12s.012-3.6.07-4.85c.054-1.17.24-1.97.4-2.43A4.92 4.92 0 0 1 3.69 3.3a4.92 4.92 0 0 1 1.76-1.02c.46-.16 1.26-.346 2.43-.4C8.4 2.212 8.8 2.2 12 2.2zM12 0C8.736 0 8.332.013 7.052.072 5.74.13 4.805.352 4.003.66a6.82 6.82 0 0 0-2.49 1.64 6.82 6.82 0 0 0-1.64 2.49C-.352 5.195-.13 6.13-.072 7.442.013 8.722 0 9.126 0 12s.013 3.278.072 4.558c.058 1.312.28 2.247.588 3.05a6.82 6.82 0 0 0 1.64 2.49 6.82 6.82 0 0 0 2.49 1.64c.803.308 1.738.53 3.05.588C8.722 23.987 9.126 24 12 24s3.278-.013 4.558-.072c1.312-.058 2.247-.28 3.05-.588a6.82 6.82 0 0 0 2.49-1.64 6.82 6.82 0 0 0 1.64-2.49c.308-.803.53-1.738.588-3.05.059-1.28.072-1.684.072-4.558s-.013-3.278-.072-4.558c-.058-1.312-.28-2.247-.588-3.05a6.82 6.82 0 0 0-1.64-2.49A6.82 6.82 0 0 0 19.608.66c-.803-.308-1.738-.53-3.05-.588C15.278.013 14.874 0 12 0zM12 5.838A6.162 6.162 0 1 0 18.162 12 6.164 6.164 0 0 0 12 5.838zm0 10.2A4.038 4.038 0 1 1 16.038 12 4.042 4.042 0 0 1 12 16.038zM18.406 4.594a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg
                className="w-6 h-6 fill-current hover:text-rose-600"
                viewBox="0 0 24 24"
              >
                <path d="M19.615 3.184C16.01 2.938 7.983 2.939 4.385 3.184.487 3.45.028 5.804 0 12c.028 6.185.484 8.549 4.385 8.816 3.598.245 11.625.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
