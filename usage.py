import dash_oncoprint
import dash
from dash.dependencies import Input, Output
import dash_html_components as html

app = dash.Dash('')

app.scripts.config.serve_locally = True
app.css.config.serve_locally = True


datum = [
    {
        "sample": "TCGA-23-1027-01",
        "gene": "BRCA1",
        "alteration": "E23fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-25-1632-01",
        "gene": "BRCA1",
        "alteration": "L1216fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-23-1026-01",
        "gene": "BRCA1",
        "alteration": "G813fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-13-0804-01",
        "gene": "BRCA1",
        "alteration": "C47W",
        "type": "MISSENSE"
    },
    {
        "sample": "TCGA-24-2298-01",
        "gene": "BRCA1",
        "alteration": "Q1395fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-61-2008-01",
        "gene": "BRCA1",
        "alteration": "W1815*",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-09-2045-01",
        "gene": "BRCA1",
        "alteration": "Q1779fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-04-1356-01",
        "gene": "BRCA1",
        "alteration": "V722fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-25-1630-01",
        "gene": "BRCA1",
        "alteration": "K519fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-24-1470-01",
        "gene": "BRCA1",
        "alteration": "L1676fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-13-0730-01",
        "gene": "BRCA1",
        "alteration": "R1835*",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-13-0883-01",
        "gene": "BRCA1",
        "alteration": "Q1756fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-25-2401-01",
        "gene": "BRCA1",
        "alteration": "Q1756fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-13-0903-01",
        "gene": "BRCA1",
        "alteration": "R504fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-13-0887-01",
        "gene": "BRCA1",
        "alteration": "E23fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-13-1494-01",
        "gene": "BRCA1",
        "alteration": "K45_splice",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-09-2051-01",
        "gene": "BRCA1",
        "alteration": "Q1756fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-23-2078-01",
        "gene": "BRCA1",
        "alteration": "E23fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-23-2079-01",
        "gene": "BRCA1",
        "alteration": "E23fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-10-0931-01",
        "gene": "BRCA1",
        "alteration": "E23fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-59-2348-01",
        "gene": "BRCA1",
        "alteration": "E797*",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-23-2077-01",
        "gene": "BRCA1",
        "alteration": "Q1756fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-09-1669-01",
        "gene": "BRCA1",
        "alteration": "E1345fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-23-2081-01",
        "gene": "BRCA1",
        "alteration": "Q1756fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-13-1408-01",
        "gene": "BRCA1",
        "alteration": "E23fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-13-1489-01",
        "gene": "BRCA1",
        "alteration": "N1265fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-25-1318-01",
        "gene": "BRCA2",
        "alteration": "L1491fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-13-0793-01",
        "gene": "BRCA2",
        "alteration": "T3085fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-24-1463-01",
        "gene": "BRCA2",
        "alteration": "G602fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-13-0913-01",
        "gene": "BRCA2",
        "alteration": "E1857fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-04-1367-01",
        "gene": "BRCA2",
        "alteration": "E294*",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-24-1562-01",
        "gene": "BRCA2",
        "alteration": "K3326*",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-04-1331-01",
        "gene": "BRCA2",
        "alteration": "C711*",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-24-1103-01",
        "gene": "BRCA2",
        "alteration": "K1638E",
        "type": "MISSENSE"
    },
    {
        "sample": "TCGA-13-0885-01",
        "gene": "BRCA2",
        "alteration": "K1406fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-13-0890-01",
        "gene": "BRCA2",
        "alteration": "V1229fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-13-1512-01",
        "gene": "BRCA2",
        "alteration": "K3326*",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-23-1030-01",
        "gene": "BRCA2",
        "alteration": "T1354M",
        "type": "MISSENSE"
    },
    {
        "sample": "TCGA-23-1026-01",
        "gene": "BRCA2",
        "alteration": "K3326*",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-25-1634-01",
        "gene": "BRCA2",
        "alteration": "E2878_splice",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-24-1555-01",
        "gene": "BRCA2",
        "alteration": "T2607fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-13-0886-01",
        "gene": "BRCA2",
        "alteration": "S1982fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-13-0792-01",
        "gene": "BRCA2",
        "alteration": "E1143D",
        "type": "MISSENSE"
    },
    {
        "sample": "TCGA-24-2293-01",
        "gene": "BRCA2",
        "alteration": "R2520*",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-23-1120-01",
        "gene": "BRCA2",
        "alteration": "L3277fs",
        "type": "TRUNC"
    },
    {
        "sample": "TCGA-25-2396-01",
        "gene": None,
        "alteration": None,
        "type": None
    },
    {
        "sample": "TCGA-25-2397-01",
        "gene": None,
        "alteration": None,
        "type": None
    },
    {
        "sample": "TCGA-25-2398-01",
        "gene": None,
        "alteration": None,
        "type": None
    },
    {
        "sample": "TCGA-25-2399-01",
        "gene": None,
        "alteration": None,
        "type": None
    },
    {
        "sample": "TCGA-25-2400-01",
        "gene": None,
        "alteration": None,
        "type": None
    },
    {
        "sample": "TCGA-25-2401-01",
        "gene": None,
        "alteration": None,
        "type": None
    },
    {
        "sample": "TCGA-25-2392-01",
        "gene": None,
        "alteration": None,
        "type": None
    },
    {
        "sample": "TCGA-25-2393-01",
        "gene": None,
        "alteration": None,
        "type": None
    }
]


app.layout = html.Div([
    dash_oncoprint.OncoPrint(
        id='input',
        data=datum
    ),
])


if __name__ == '__main__':
    app.run_server(debug=True)
