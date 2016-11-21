#!/bin/bash

# http://stackoverflow.com/a/246128/878361
# the directory in which the script is stored
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

tmux new-session -d -n 'npm' -s 'cevirgec' -c "$DIR"
tmux split-window -h -c "$DIR"
tmux new-window -n 'git' -t 'cevirgec' -c "$DIR"
