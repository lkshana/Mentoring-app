import os

def combine_files_to_text(directory, output_file):
    with open(output_file, 'w') as outfile:
        for filename in os.listdir(directory):
            file_path = os.path.join(directory, filename)
            if os.path.isfile(file_path):
                with open(file_path, 'r') as infile:
                    outfile.write(f"{filename}\n")
                    outfile.write(infile.read())
                    outfile.write("\n")

# Example usage:
combine_files_to_text('.', 'output.txt')

