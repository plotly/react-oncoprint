# Import required libraries
import json

import dash
import dash_html_components as html
import dash_core_components as dcc
import dash_oncoprint
from dash.dependencies import Input, Output


# Load external demo data
with open('data/dataset1.json', encoding='utf-8') as data_file:
    dataset1 = json.loads(data_file.read())

with open('data/dataset2.json', encoding='utf-8') as data_file:
    dataset2 = json.loads(data_file.read())

with open('data/dataset3.json', encoding='utf-8') as data_file:
    dataset3 = json.loads(data_file.read())

with open('data/cBioPortalData.json', encoding='utf-8') as data_file:
    cBioPortalData = json.loads(data_file.read())

datasets = {
    'dataset1': dataset1,
    'dataset2': dataset2,
    'dataset3': dataset3,
    'cBioPortalData': cBioPortalData,
}


# Build Dash app
app = dash.Dash('')

app.scripts.config.serve_locally = True
app.css.config.serve_locally = True

app.layout = html.Div([
    html.H1(
        id='title',
        children="dash-oncoprint Demo"
    ),
    html.Div([
        html.P(
            id='text',
            children="Selected file"
        ),
        dcc.Dropdown(
            id='dropdown',
            options=[
                {'label': 'Small dataset', 'value': 'dataset1'},
                {'label': 'Medium dataset', 'value': 'dataset2'},
                {'label': 'Large dataset', 'value': 'dataset3'},
                {'label': 'cBioPortalData dataset', 'value': 'cBioPortalData'},
            ],
            value='dataset3'
        ),
    ],
        style={
            'padding': 16,
            'marginBottom': 32,
            'background': "#FFFFFF"
        },
    ),
    dash_oncoprint.OncoPrint(
        id='chart',
        data=dataset3
    ),
],
    style={
        'fontFamily': ["helvetica", "sans-serif"],
        'padding': 16,
        'background': "#F5F5F5"
    },
)


@app.callback(
    Output('chart', 'data'),
    [Input('dropdown', 'value')]
)
def update_chart(input):
    return datasets[input]


@app.callback(
    Output('text', 'children'),
    [Input('dropdown', 'value')]
)
def update_text(input):
    return "Selected file: {}.js".format(input)


# Main loop
if __name__ == '__main__':
    app.run_server(debug=True)
