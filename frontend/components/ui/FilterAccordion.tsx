// "use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  type LayoutChangeEvent,
} from "react-native";
import { ChevronDown, ChevronUp, Plus } from "react-native-feather";

// if (Platform.OS === "android") {
//     if (UIManager.setLayoutAnimationEnabledExperimental) {
//       UIManager.setLayoutAnimationEnabledExperimental(true);
//     }
// }

interface FilterOption {
  id: string;
  label: string;
}

interface FilterAccordionProps {
  title: string;
  options: FilterOption[];
  selectedOptions: string[];
  onToggleOption: (optionId: string) => void;
}

const FilterAccordion: React.FC<FilterAccordionProps> = ({
  title,
  options,
  selectedOptions,
  onToggleOption,
}) => {
  const [expanded, setExpanded] = useState(true);
  const [showAllOptions, setShowAllOptions] = useState(false);
  const [visibleOptions, setVisibleOptions] = useState<FilterOption[]>(options);
  const [hasMoreOptions, setHasMoreOptions] = useState(false);

  // References to track layout measurements
  const optionHeights = useRef<number[]>([]);
  const containerWidth = useRef<number>(0);
  const optionWidths = useRef<{ [key: string]: number }>({});

  // Reset visible options when options change
  useEffect(() => {
    calculateVisibleOptions();
  }, [options, showAllOptions]);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };
  const toggleShowMore = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowAllOptions(!showAllOptions);
  };

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    containerWidth.current = event.nativeEvent.layout.width;
    calculateVisibleOptions();
  };

  const handleOptionLayout = (
    event: LayoutChangeEvent,
    index: number,
    optionId: string
  ) => {
    // Store the width of this option
    optionWidths.current[optionId] = event.nativeEvent.layout.width;

    // Store the height (assuming all options have the same height)
    if (optionHeights.current.length === 0) {
      optionHeights.current.push(event.nativeEvent.layout.height);
    }

    // After measuring all options, calculate which ones should be visible
    if (Object.keys(optionWidths.current).length === options.length) {
      calculateVisibleOptions();
    }
  };

  const calculateVisibleOptions = () => {
    // If showing all options or not enough measurements yet, show all options
    if (
      showAllOptions ||
      containerWidth.current === 0 ||
      Object.keys(optionWidths.current).length < options.length
    ) {
      setVisibleOptions(options);
      return;
    }

    // Calculate how many options fit in two lines
    const availableWidth = containerWidth.current;
    let currentLineWidth = 0;
    let lineCount = 1;
    let visibleCount = 0;

    // Add 10px gap between options (from the gap in styles)
    const gap = 10;

    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      const optionWidth = optionWidths.current[option.id] || 0;

      // If this option doesn't fit on the current line, move to next line
      if (currentLineWidth + optionWidth > availableWidth) {
        currentLineWidth = optionWidth + gap;
        lineCount++;
      } else {
        currentLineWidth += optionWidth + gap;
      }

      // Count options that fit in first two lines
      if (lineCount <= 2) {
        visibleCount++;
      } else {
        break;
      }
    }

    // Set visible options and determine if we need "Show more"
    setVisibleOptions(options.slice(0, visibleCount));
    setHasMoreOptions(visibleCount < options.length);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleExpand}>
        {expanded ? (
          <ChevronDown width={24} height={24} color="#666" />
        ) : (
          <ChevronUp width={24} height={24} color="#666" />
        )}
        <Text style={styles.headerText}>{title}</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.content}>
          <View
            style={styles.optionsContainer}
            onLayout={handleContainerLayout}
          >
            {(showAllOptions ? options : visibleOptions).map(
              (option, index) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionButton,
                    selectedOptions.includes(option.id)
                      ? styles.selectedOption
                      : styles.unselectedOption,
                  ]}
                  onPress={() => onToggleOption(option.id)}
                  onLayout={(e) => handleOptionLayout(e, index, option.id)}
                >
                  <Plus
                    width={16}
                    height={16}
                    color={
                      selectedOptions.includes(option.id) ? "white" : "#666"
                    }
                  />
                  <Text
                    style={[
                      styles.optionText,
                      selectedOptions.includes(option.id)
                        ? styles.selectedOptionText
                        : styles.unselectedOptionText,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>
          {hasMoreOptions && (
            <TouchableOpacity onPress={toggleShowMore}>
              <Text style={styles.showMoreText}>
                {showAllOptions ? "Show less" : "Show more"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};
export default FilterAccordion;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingVertical: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 8,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    justifyContent: "center",
  },
  selectedOption: {
    backgroundColor: "#E67E22",
  },
  unselectedOption: {
    backgroundColor: "#E0E0E0",
  },
  optionText: {
    marginLeft: 6,
    fontWeight: "500",
  },
  selectedOptionText: {
    color: "white",
  },
  unselectedOptionText: {
    color: "#666",
  },
  showMoreText: {
    color: "#2980B9",
    fontSize: 16,
    marginBottom: 16,
  },
});
