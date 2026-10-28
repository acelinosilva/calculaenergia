import React from 'react';

interface AdSlotProps {
  id?: string;
  format?: 'leaderboard' | 'in-content' | 'rectangle' | 'sidebar';
  label?: string;
  className?: string;
}

const AD_SRC_DOC = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script>
      (function () {
        window.addEventListener(
          'error',
          function (e) {
            var msg = (e && e.message) || '';
            var file = (e && e.filename) || '';
            if (
              file.indexOf('chrome-extension://') !== -1 ||
              msg.indexOf('Cannot set property fetch') !== -1
            ) {
              e.stopImmediatePropagation();
              e.preventDefault();
              return false;
            }
          },
          true
        );
        try {
          var desc =
            Object.getOwnPropertyDescriptor(window, 'fetch') ||
            Object.getOwnPropertyDescriptor(Window.prototype, 'fetch');
          if (desc && desc.get && !desc.set && desc.configurable !== false) {
            var currentFetch = window.fetch.bind(window);
            Object.defineProperty(window, 'fetch', {
              configurable: true,
              enumerable: true,
              get: function () {
                return currentFetch;
              },
              set: function (v) {
                if (typeof v === 'function') {
                  currentFetch = v;
                }
              }
            });
          }
        } catch (e) {}
      })();
    </script>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        width: 300px;
        height: 250px;
        overflow: hidden;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>
  </head>
  <body>
    <script>
      atOptions = {
        'key' : '97c414d22f3cbe3dbb0ec4f238337069',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    </script>
    <script src="https://www.highrevenueformat.com/97c414d22f3cbe3dbb0ec4f238337069/invoke.js"></script>
  </body>
</html>`;

export const AdSlot: React.FC<AdSlotProps> = ({
  id = 'ad-slot',
  label = 'Publicidade',
  className = '',
}) => {
  return (
    <aside
      id={id}
      aria-label={label}
      className={`my-6 mx-auto flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200/80 bg-slate-100/50 transition-colors w-full max-w-full ${className}`}
    >
      <div className="flex items-center justify-center w-full max-w-[300px] pb-1.5 mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        <span>{label}</span>
      </div>

      <div className="flex items-center justify-center w-[300px] h-[250px] max-w-full overflow-hidden rounded-lg">
        <iframe
          srcDoc={AD_SRC_DOC}
          title={`${label} - ${id}`}
          width={300}
          height={250}
          scrolling="no"
          frameBorder={0}
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
          className="w-[300px] h-[250px] border-0 overflow-hidden"
        />
      </div>
    </aside>
  );
};


