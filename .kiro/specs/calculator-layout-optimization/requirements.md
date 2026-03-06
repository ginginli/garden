# Requirements Document

## Introduction

本文档定义了 Garden Horizons Calculator 布局优化功能的需求。目标是优化计算器界面布局，使用户能在一个屏幕内（无需上下滚动）完成所有计算器操作和查看结果，提升用户体验和操作效率。

当前问题：用户需要上下滚动才能对比输入参数和计算结果，而竞品可以在一屏内完成所有操作。

## Glossary

- **Calculator_UI**: Garden Horizons Calculator 的用户界面系统
- **Input_Panel**: 左侧输入面板，包含植物选择、变种、成熟度、突变和重量等输入控件
- **Results_Panel**: 右侧结果面板，显示计算结果和公式分解
- **Plant_List**: 植物选择列表，当前包含 26 个植物
- **Mutation_List**: 突变选择列表，当前包含 16 个突变选项
- **Viewport**: 用户可见的屏幕区域，目标为 1080p (1920×1080) 分辨率
- **Vertical_Spacing**: 垂直方向的间距，包括 margin 和 padding
- **Formula_Breakdown**: 公式分解展示区域，显示计算步骤

## Requirements

### Requirement 1: 减小垂直间距以压缩整体高度

**User Story:** 作为用户，我希望界面更紧凑，这样我可以在一屏内看到更多内容。

#### Acceptance Criteria

1. THE Calculator_UI SHALL reduce section margin-bottom from 32px to 20px
2. THE Calculator_UI SHALL reduce panel padding from 32px to 24px
3. THE Calculator_UI SHALL reduce section heading margin-bottom from 16px to 12px
4. THE Calculator_UI SHALL reduce section heading font-size from 1.25rem to 1.1rem
5. WHEN all spacing reductions are applied, THE Calculator_UI SHALL maintain visual hierarchy and readability

### Requirement 2: 优化植物列表布局以减少高度占用

**User Story:** 作为用户，我希望植物列表更紧凑，这样我可以减少滚动操作。

#### Acceptance Criteria

1. THE Plant_List SHALL increase grid columns from 3 to 4
2. THE Plant_List SHALL reduce plant item padding from 12px to 8px
3. THE Plant_List SHALL reduce plant item gap from 8px to 6px
4. THE Plant_List SHALL reduce plant image size from 40px to 32px
5. THE Plant_List SHALL reduce plant name font-size to 0.8rem
6. WHEN a plant is selected, THE Plant_List SHALL maintain clear visual feedback with selected state

### Requirement 3: 优化突变列表布局以减少高度占用

**User Story:** 作为用户，我希望突变列表不需要滚动，这样我可以一眼看到所有选项。

#### Acceptance Criteria

1. THE Mutation_List SHALL reduce max-height from 400px to 280px
2. THE Mutation_List SHALL reduce mutation item padding from 8px 14px to 6px 12px
3. THE Mutation_List SHALL reduce mutation item gap from 8px to 6px
4. THE Mutation_List SHALL reduce mutation emoji font-size from 1.2rem to 1rem
5. THE Mutation_List SHALL reduce mutation name and multiplier font-size to 0.85rem
6. WHEN mutations are selected, THE Mutation_List SHALL maintain clear visual feedback with selected state

### Requirement 4: 移除结果面板中的植物信息展示

**User Story:** 作为用户，我不需要在结果面板中再次看到植物图片和名称，因为我已经在输入面板中选择了植物。

#### Acceptance Criteria

1. THE Results_Panel SHALL hide the result-plant-display section containing plant image and name
2. WHEN a plant is selected and calculation is performed, THE Results_Panel SHALL display only the Final Sell Price and Formula Breakdown
3. THE Results_Panel SHALL maintain the main result card with sell price as the first visible element

### Requirement 5: 优化公式分解展示以减少高度占用

**User Story:** 作为用户，我希望公式分解更紧凑，这样结果面板不会占用太多垂直空间。

#### Acceptance Criteria

1. THE Formula_Breakdown SHALL reduce padding from 20px to 16px
2. THE Formula_Breakdown SHALL reduce heading margin-bottom from 16px to 12px
3. THE Formula_Breakdown SHALL reduce heading font-size from 1.1rem to 1rem
4. THE Formula_Breakdown SHALL reduce formula step padding from 10px 12px to 8px 10px
5. THE Formula_Breakdown SHALL reduce formula step gap from 8px to 6px
6. THE Formula_Breakdown SHALL reduce formula step font-size from 0.95rem to 0.85rem

### Requirement 6: 优化按钮组布局以减少高度占用

**User Story:** 作为用户，我希望变种和成熟度按钮更紧凑，这样可以节省垂直空间。

#### Acceptance Criteria

1. THE Calculator_UI SHALL reduce stage button padding from 8px to 6px
2. THE Calculator_UI SHALL reduce stage button gap from 12px to 8px
3. THE Calculator_UI SHALL reduce stage emoji font-size from 1.25rem to 1.1rem
4. THE Calculator_UI SHALL reduce stage name font-size from 0.85rem to 0.8rem
5. THE Calculator_UI SHALL reduce stage multiplier font-size from 0.8rem to 0.75rem

### Requirement 7: 优化重量滑动条展示以减少高度占用

**User Story:** 作为用户，我希望重量滑动条区域更紧凑，这样可以节省垂直空间。

#### Acceptance Criteria

1. THE Calculator_UI SHALL reduce weight slider container margin-top from 12px to 8px
2. THE Calculator_UI SHALL reduce weight display margin-top from 12px to 8px
3. THE Calculator_UI SHALL reduce weight display font-size from 1.1rem to 1rem
4. THE Calculator_UI SHALL reduce weight base label font-size from 0.85rem to 0.8rem

### Requirement 8: 确保单屏显示兼容性

**User Story:** 作为用户，我希望在标准 1080p 屏幕上无需滚动即可看到所有输入和结果。

#### Acceptance Criteria

1. WHEN the Calculator_UI is displayed on a 1920×1080 viewport, THE Calculator_UI SHALL fit all input controls and results within the visible area without vertical scrolling
2. THE Calculator_UI SHALL maintain a maximum content height of 900px (accounting for header and padding)
3. WHEN all optimizations are applied, THE Calculator_UI SHALL preserve all functionality and user interactions
4. THE Calculator_UI SHALL maintain visual balance between Input_Panel and Results_Panel

### Requirement 9: 保持响应式设计兼容性

**User Story:** 作为用户，我希望在不同屏幕尺寸上都能获得良好的体验。

#### Acceptance Criteria

1. WHEN the viewport width is less than 1024px, THE Calculator_UI SHALL maintain single-column layout
2. WHEN the viewport width is less than 768px, THE Calculator_UI SHALL adjust plant list to 2 columns
3. THE Calculator_UI SHALL maintain all spacing optimizations across different viewport sizes
4. THE Calculator_UI SHALL ensure touch targets remain accessible on mobile devices (minimum 44px)

### Requirement 10: 保持视觉层次和可读性

**User Story:** 作为用户，我希望界面紧凑的同时仍然清晰易读。

#### Acceptance Criteria

1. THE Calculator_UI SHALL maintain sufficient contrast ratios for all text elements (WCAG AA standard)
2. THE Calculator_UI SHALL maintain clear visual hierarchy with headings, labels, and values
3. THE Calculator_UI SHALL ensure all interactive elements have clear hover and active states
4. THE Calculator_UI SHALL maintain consistent spacing ratios throughout the interface
5. WHEN spacing is reduced, THE Calculator_UI SHALL ensure no visual elements overlap or become cramped

