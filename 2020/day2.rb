input = File.readlines('2.txt').join.split(/\n/)

def part_one(arr)                                                # RETURN COUNT OF VALID STRINGS WHERE # OF CHAR IN STRING IS IN RANGE
    valid_count = 0

    arr.each do |ele|
        range, letter, string = ele.split(" ")                                  # ARRAY DESTRUCTURE
        count = 0

        string.each_char {|char| count += 1 if char == letter[0]}               # letter[0] BC HAS A ':' FOLLOWING LETTER
        
        num_range = range.split("-").map {|num| num.to_i}                       # RETURNS [min, max] PAIR
        valid_count += 1 if count >= num_range[0] && count <= num_range[-1]
    end

    valid_count
end


def part_two(arr)                   # RETURN COUNT OF VALID STRINGS WHERE INDEXED CHAR IS EITHER RANGE[0] OR RANGE[1] BUT NOT BOTH
                                    # ALSO, THERE IS NO 0 INDEX
    valid_count = 0

    arr.each do |ele|
        range, letter, string = ele.split(" ")

        idx1, idx2 = range.split("-").map {|num| num.to_i}
    
        if string[idx1-1] == letter[0] && string[idx2-1] == letter[0]
            valid_count
        elsif string[idx1-1] == letter[0] || string[idx2-1] == letter[0]
            valid_count += 1
        end    
    end
    valid_count
end

# p part_one(input)          # 439
# p part_two(input)          # 584
