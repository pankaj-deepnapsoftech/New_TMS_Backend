export const HealthPage = (_req, res) => {
    res.send(`
     <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Rocket Launch 🚀</title>
      <style>
        body {
          margin: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(to top, #00111a, #003366);
          overflow: hidden;
          font-family: Arial, sans-serif;
          color: white;
        }

        .rocket {
          position: relative;
          width: 60px;
          height: 120px;
          background: white;
          border-radius: 30px;
          animation: launch 5s ease-in forwards;
        }

        /* ✅ Flame now appears BELOW rocket */
        .flame {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 40px;
          background: orange;
          border-radius: 50% 50% 50% 50%;
          animation: flame 0.2s infinite alternate;
        }

        .window {
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          width: 25px;
          height: 25px;
          background: #00bcd4;
          border-radius: 50%;
          border: 3px solid #003366;
        }

        @keyframes flame {
          from { height: 40px; background: orange; }
          to { height: 60px; background: yellow; }
        }

        @keyframes launch {
          0%   { transform: translateY(0); }
          50%  { transform: translateY(-60vh); }
          100% { transform: translateY(-120vh); opacity: 0; }
        }

        h1 {
          margin-top: 20px;
          font-size: 2rem;
          letter-spacing: 2px;
        }

        .status {
          margin-top: 40px;
          text-align: left;
        }

        .status p {
          font-size: 1.2rem;
          margin: 8px 0;
          opacity: 0;
          animation: fadeIn 1s forwards;
        }

        .status p:nth-child(1) { animation-delay: 2s; }
        .status p:nth-child(2) { animation-delay: 3s; }
        .status p:nth-child(3) { animation-delay: 4s; }
        .status p:nth-child(4) { animation-delay: 5s; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>
    </head>
    <body>
      <div class="rocket">
        <div class="window"></div>
        <div class="flame"></div> <!-- ✅ Fixed flame position -->
      </div>

      <h1>🚀 Server Launched Successfully!</h1>

      <div class="status">
        <p>✅ Server is Healthy</p>
        <p>⚡ API Connected</p>
        <p>🗄️ Database Running</p>
        <p>🔒 Security Enabled</p>
      </div>
    </body>
    </html>
        `)
}