import os

output_file_path = "/usr/share/nginx/html/env.js"

string = "window.env = {\n"
for key, value in os.environ.items():
    string += f"\t{key}: '{value}',\n"
string += "};"

with open(output_file_path, 'w') as json_file:
    json_file.write(string)