require "set"

directions = []

# PART ONE:
# acc increases or decreases a single global value called accumulator by the value given in argument. 
# For example, acc +7 would increase the accumulator by 7. The accumulator starts at 0. 
# After an acc instruction, the instruction immediately below it is executed next.

# jmp jumps to a new instruction relative to itself. 
# The next instruction to execute is found using the argument as an offset from the jmp instruction; 
# for example, jmp +2 would skip the next instruction, jmp +1 would continue to the instruction immediately below it,
# and jmp -20 would cause the instruction 20 lines above to be executed next.

# nop stands for No OPeration - it does nothing. The instruction immediately below it is executed next.

# FIND accumulator val BEFORE IT GOES INTO INFINITE LOOP

    File.readlines('moves.txt').each_with_index do |line, idx|
        direction, amount = line.split(' ')
        directions.push([idx, direction, amount.to_i])
    end

    def get_accumulator(directions)
        visited = Set.new
        accumulated = 0
        pos = 0

        while !visited.include?(pos)   
            move = directions[pos]
            visited.add(pos)

            if move[1] == "acc"
                accumulated += move[-1]
                pos += 1
            elsif move[1] == "jmp"
                pos += move[-1]
            elsif move[1] == "nop"
                pos += 1
            end
        end
        accumulated
    end

# PART TWO: SWAPPING ONLY ONE 'nop' FOR 'jmp' OR 'jmp' FOR 'nop' WHAT IS ACCUMULATOR WHEN EXIT THE GAME?
    # POSITION NEEDS TO EXCEED THOSE FOUND IN directions

    nop_and_jmp = []
    directions.each {|direction| nop_and_jmp.push(direction[0]) if direction[1] == 'nop'|| direction[1] == 'jmp'}

    nop_and_jmp.each do |j|
        acc = 0
        i = 0
        visited = Set.new
        new_directions = Marshal.load(Marshal.dump(directions))                 # WAY TO DEEP COPY?

        new_directions[j][1] == 'jmp' ? new_directions[j][1] = 'nop' : new_directions[j][1] = 'jmp'

        while !visited.include?(i)
            idx, action, amount = new_directions[i]
            visited.add(i)

            if action == "nop"
                i += 1
            elsif action == "acc"
                acc += amount
                i += 1
            elsif action == "jmp"
                i += amount
            elsif action == nil                 # HAVE EXITED directions
                p acc
                break
            end
        end
    end