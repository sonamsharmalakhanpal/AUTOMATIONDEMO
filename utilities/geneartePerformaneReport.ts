import fs from "fs";
import path from "path";

function convertJsonToHtml(jsonPath: string, outputPath: string) {
  const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  const agg = jsonData.aggregate;

  // KPIs for summary cards
  const totalRequests = agg.counters["http.requests"];
  const totalVusers = agg.counters["vusers.created"];
  const totalCompleted = agg.counters["vusers.completed"];
  const totalFailed = agg.counters["vusers.failed"];
  const http200 = agg.counters["http.codes.200"];
  const http201 = agg.counters["http.codes.201"];
  const avgRespTime = agg.summaries["http.response_time"].mean;
  const p95RespTime = agg.summaries["http.response_time"].p95;
  const avgSessionLength = agg.summaries["vusers.session_length"].mean;

  // Summary Table
  const counters = agg.counters;
  const summaryRows = Object.entries(counters)
    .map(([key, value]) => `<tr><td>${key}</td><td>${value}</td></tr>`)
    .join("");

  // Response Time Histogram
  const hist = agg.histograms["http.response_time"];
  const histLabels = ["min", "p50", "median", "p75", "p90", "p95", "p99", "p999", "max"];
  const histData = histLabels.map(l => hist[l]);

  // Session Length Histogram
  const sessionHist = agg.histograms["vusers.session_length"];
  const sessionData = histLabels.map(l => sessionHist[l]);

  //HTML with Chart.js and summary cards
  const template = `
    <html>
      <head>
        <title>Artillery Performance Report</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Roboto', Arial, sans-serif; background: #f7f9fa; margin: 0; padding: 0; }
          .container { max-width: 1100px; margin: 40px auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); padding: 32px; }
          h1 { color: #2c3e50; font-size: 2.2em; margin-bottom: 8px; }
          h2 { color: #34495e; margin-top: 32px; }
          .summary-cards { display: flex; gap: 24px; margin-bottom: 32px; flex-wrap: wrap; }
          .card { background: #f2f6fa; border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); padding: 24px 32px; flex: 1; min-width: 180px; text-align: center; }
          .card-title { font-size: 1em; color: #7b8a97; margin-bottom: 6px; }
          .card-value { font-size: 2em; font-weight: 700; color: #2c3e50; }
          .card-success { color: #27ae60; }
          .card-warning { color: #e67e22; }
          .card-danger { color: #c0392b; }
          table { border-collapse: collapse; width: 100%; margin-top: 20px; background: #fff; }
          th, td { border: 1px solid #e1e4e8; padding: 10px 14px; text-align: left; }
          th { background: #f2f6fa; color: #34495e; font-weight: 700; }
          tr:nth-child(even) { background: #f7f9fa; }
          .section { margin-top: 40px; }
          .chart-container { background: #fff; border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); padding: 24px; margin-bottom: 32px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Artillery Performance Report</h1>
          <div class="summary-cards">
            <div class="card">
              <div class="card-title">Total Requests</div>
              <div class="card-value">${totalRequests}</div>
            </div>
            <div class="card">
              <div class="card-title">VUsers Created</div>
              <div class="card-value">${totalVusers}</div>
            </div>
            <div class="card">
              <div class="card-title">VUsers Completed</div>
              <div class="card-value card-success">${totalCompleted}</div>
            </div>
            <div class="card">
              <div class="card-title">VUsers Failed</div>
              <div class="card-value card-danger">${totalFailed}</div>
            </div>
            <div class="card">
              <div class="card-title">HTTP 200</div>
              <div class="card-value card-success">${http200}</div>
            </div>
            <div class="card">
              <div class="card-title">HTTP 201</div>
              <div class="card-value card-success">${http201}</div>
            </div>
            <div class="card">
              <div class="card-title">Avg Response Time (ms)</div>
              <div class="card-value card-warning">${avgRespTime}</div>
            </div>
            <div class="card">
              <div class="card-title">95th %ile Resp Time (ms)</div>
              <div class="card-value card-warning">${p95RespTime}</div>
            </div>
            <div class="card">
              <div class="card-title">Avg Session Length (ms)</div>
              <div class="card-value">${avgSessionLength}</div>
            </div>
          </div>

          <div class="section">
            <h2>Key Metrics Table</h2>
            <table>
              <tr><th>Metric</th><th>Value</th></tr>
              ${summaryRows}
            </table>
          </div>

          <div class="section chart-container">
            <h2>Response Time Histogram</h2>
            <canvas id="responseTimeChart" width="900" height="350"></canvas>
          </div>

          <div class="section chart-container">
            <h2>Session Length Histogram</h2>
            <canvas id="sessionLengthChart" width="900" height="350"></canvas>
          </div>

          <script>
            const histLabels = ${JSON.stringify(histLabels)};
            const responseTimeData = ${JSON.stringify(histData)};
            const sessionLengthData = ${JSON.stringify(sessionData)};

            new Chart(document.getElementById('responseTimeChart').getContext('2d'), {
              type: 'bar',
              data: {
                labels: histLabels,
                datasets: [{
                  label: 'Response Time (ms)',
                  data: responseTimeData,
                  backgroundColor: 'rgba(54, 162, 235, 0.7)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 2
                }]
              },
              options: {
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, title: { display: true, text: 'Milliseconds' } } },
                responsive: true
              }
            });

            new Chart(document.getElementById('sessionLengthChart').getContext('2d'), {
              type: 'bar',
              data: {
                labels: histLabels,
                datasets: [{
                  label: 'Session Length (ms)',
                  data: sessionLengthData,
                  backgroundColor: 'rgba(255, 99, 132, 0.7)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 2
                }]
              },
              options: {
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, title: { display: true, text: 'Milliseconds' } } },
                responsive: true
              }
            });
          </script>
        </div>
      </body>
    </html>
  `;

  fs.writeFileSync(outputPath, template, "utf-8");
  console.log(`✅ HTML report generated at ${outputPath}`);
}

// Example usage
const inputJson = path.join(__dirname, "..", "nftartilleryresult.json");
const outputHtml = path.join(__dirname, "..", "nftartillery.html");
convertJsonToHtml(inputJson, outputHtml);
