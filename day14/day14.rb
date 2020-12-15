input = File.readlines('14.txt').map {|ele| ele.chomp}

# PART ONE

def sum_bits(data)
  hash = {}
  mask = ""

  data.each do |line|
    if line.include?("mask")
      mask = line.match(/= (.*)/).captures.first
    else
      replacements = line.match(/\[(\d+)\] = (\d+)/).captures 
    # p replacements  [ "123", "4567"]

      idx = replacements[0].to_i
      binaried = replacements[1].to_i.to_s(2)

      result = mask.reverse.chars.zip(binaried.reverse.chars).map do |orchar, replace_char|
        # TAKES FORM [[old_char, new_char], [old_char, new_char]...]
        if orchar != "X"
          orchar
        else
          replace_char || "0"
        end
      end

      hash[idx] = result.reverse.join.to_i(2)
    end
  end

  hash.values.sum
end

p sum_bits(input)               # RETURNS 6386593869035