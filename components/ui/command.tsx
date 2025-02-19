"use client"

import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

type PrimitiveType = typeof CommandPrimitive & {
  displayName: string
  Input: React.ForwardRefExoticComponent<any>
  List: React.ForwardRefExoticComponent<any>
  Empty: React.ForwardRefExoticComponent<any>
  Group: React.ForwardRefExoticComponent<any>
  Item: React.ForwardRefExoticComponent<any>
  Separator: React.ForwardRefExoticComponent<any>
  (props: BaseCommandProps & { ref?: React.Ref<HTMLDivElement> }): JSX.Element
}

const TypedCommandPrimitive = CommandPrimitive as PrimitiveType

// Update the type definition
type ReactNodeWithoutBigInt = Exclude<React.ReactNode, bigint>

interface BaseCommandProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
}

type CommandPrimitiveElement = HTMLDivElement
type CommandPrimitiveProps = BaseCommandProps

const Command = React.forwardRef<CommandPrimitiveElement, CommandPrimitiveProps>(
  ({ className, ...props }, ref) => (
    <TypedCommandPrimitive
      ref={ref}
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        className
      )}
      {...props}
    />
  )
)
Command.displayName = TypedCommandPrimitive.displayName

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

type CommandInputElement = HTMLInputElement
type CommandInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
  value?: string
  onChange?: (value: string) => void
}

const CommandInput = React.forwardRef<CommandInputElement, CommandInputProps>(
  ({ className, ...props }, ref) => (
    <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <TypedCommandPrimitive.Input
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
)

CommandInput.displayName = TypedCommandPrimitive.Input.displayName

type CommandListElement = HTMLDivElement
type CommandListProps = React.HTMLAttributes<HTMLDivElement>

const CommandList = React.forwardRef<CommandListElement, CommandListProps>(
  ({ className, ...props }, ref) => (
    <TypedCommandPrimitive.List
      ref={ref}
      className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
      {...props}
    />
  )
)

CommandList.displayName = TypedCommandPrimitive.List.displayName

type CommandEmptyElement = HTMLDivElement
type CommandEmptyProps = React.HTMLAttributes<HTMLDivElement>

const CommandEmpty = React.forwardRef<CommandEmptyElement, CommandEmptyProps>(
  (props, ref) => (
    <TypedCommandPrimitive.Empty
      ref={ref}
      className="py-6 text-center text-sm"
      {...props}
    />
  )
)

CommandEmpty.displayName = TypedCommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof TypedCommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof TypedCommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <TypedCommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))

CommandGroup.displayName = TypedCommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof TypedCommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof TypedCommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <TypedCommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = TypedCommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof TypedCommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof TypedCommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <TypedCommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    )}
    {...props}
  />
))

CommandItem.displayName = TypedCommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
  type BaseCommandProps as CommandProps,
}
